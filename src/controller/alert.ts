import { NextFunction, Request, Response } from 'express';
import { readJsonFile, writeJsonFile } from '../util/jsonStorage';

const postSpreadAlert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { marketId, spread } = req.body;
        const alerts = await readJsonFile('alertSpread.json');
        // we need to check if the alert already exists
        const alertExists = alerts.find((alert: any) => alert.marketId === marketId);
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

const getSpreadAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alerts = await readJsonFile('alertSpread.json');
        res.status(200).json(alerts);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    postSpreadAlert,
    getSpreadAlerts
};
