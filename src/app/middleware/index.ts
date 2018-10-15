import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';

export function getAllRows(req: Request, res: Response, next: NextFunction) {
    sheetsAPI.getData((error, response) => {
        if (error) {
            console.log(`ERROR -- ${error}`);
            throw error;
        }
        res.status(200).json(response);
    });
}
