import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';

export function getAllRows(req: Request, res: Response, next: NextFunction) {
    sheetsAPI.getData((error, response) => {
        if (error) {
            res.status(404).json({
                code: 404,
                error
            });
        } else if (response) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                code: 404,
                message: `response was ${response}`
            });
        }
    });
}

export function writeAllRows(req: Request, res: Response, next: NextFunction) {
    console.log('Writing all rows...');
    res.status(203).send('Writing all rows');
}
