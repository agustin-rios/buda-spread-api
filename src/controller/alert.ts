import { NextFunction, Request, Response } from 'express';
import { readJsonFile, writeJsonFile } from '../util/jsonStorage';

type Alert = {
    marketId: string;
    spread: number;
}

// uri: /api/alert/spread  :post
export const postSpreadAlert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { marketId, spread } : {marketId: string, spread: number} = req.body;
        const alerts: Alert[] = await readJsonFile('alertSpread.json');
        // we need to check if the alert already exists
        const alertExists = alerts.find((alert: Alert) => alert.marketId === marketId);
        if (alertExists) {
            // if the alert exists, we update the spread
            alertExists.spread = spread;
        } else {
            // if the alert doesn't exist, we create it
            alerts.push({ marketId, spread });
        }
        await writeJsonFile('alertSpread.json', alerts);
        res.status(201).json({ message: 'Alert created successfully' });
    } catch (error) {
        next(error);
    }
    }

// uri: /api/alert/spread  :get
export const getSpreadAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alerts: Alert[] = await readJsonFile('alertSpread.json');
        res.status(200).json(alerts);
    } catch (error) {
        next(error);
    }
}
