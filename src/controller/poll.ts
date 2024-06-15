import { NextFunction, Request, Response } from 'express';
import { readJsonFile } from '../util/jsonStorage';
import { getMarketOrderBook } from "../api/buda";
import { calculateSpread, SpreadResponse } from '../util/order_book';

type Alert = {
    marketId: string;
    spread: number;
}

// uri: /api/poll/:marketId :get
export const getUpdateAlertByMarketId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { marketId } = req.params;

        const alerts: Alert[] = await readJsonFile('alertSpread.json');
        const alert = alerts.find((alert: Alert) => alert.marketId === marketId);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });

        const { data } = await getMarketOrderBook({ params: { path: { marketId }} });
        const { order_book } = data;

        const { spread, error } : SpreadResponse = calculateSpread( marketId, order_book );
        if (!spread) return res.status(200).json({ message: error, state: false });
        // if spread is greater or lower than the alert, we message the user
        if (spread > alert.spread) {
            return res.status(200).json({ message: 'Spread is greater than the alert', state: true });
        } else if (spread < alert.spread) {
            return res.status(200).json({ message: 'Spread is lower than the alert', state: true });
        } else {
            return res.status(200).json({ message: 'Spread is equal to the alert', state: false });
        }

    } catch (error) {
        next(error);
    }
}

// uri: /api/poll :get
export const getUpdateAlertOnAllMarket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alerts: Alert[] = await readJsonFile('alertSpread.json');
        const alertsState = await Promise.all(alerts.map(async (alert: Alert) => {
            const { data } = await getMarketOrderBook({ params: { path: { marketId: alert.marketId }} });
            const { order_book } = data;
            const { spread, error } : SpreadResponse = calculateSpread( alert.marketId, order_book );
            if (!spread) return { message: error, state: false };
            // if spread is greater or lower than the alert, we message the user
            if (spread > alert.spread) {
                return { message: 'Spread is greater than the alert', state: true };
            } else if (spread < alert.spread) {
                return { message: 'Spread is lower than the alert', state: true };
            } else {
                return { message: 'Spread is equal to the alert', state: false };
            }
        }));
        res.status(200).json(alertsState);
    } catch (error) {
        next(error);
    }
}
