import { NextFunction, Request, Response } from 'express';
import { readJsonFile, writeJsonFile } from '../util/jsonStorage';

const postSpreadAlert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { marketId, spread } = req.body;
        const alerts = await readJsonFile();
        alerts.push({ marketId, spread });
        await writeJsonFile(alerts);
        res.status(201).json({ marketId, spread });
    } catch (error) {
        next(error);
    }
    }

const getSpreadAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const alerts = await readJsonFile();
        res.status(200).json(alerts);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    postSpreadAlert,
    getSpreadAlerts
};