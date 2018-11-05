import { Request, Response, NextFunction } from 'express';
import { angularURL, corsHeaders, corsMethods } from './';
export function allowCORS(req: Request, res: Response, next: NextFunction) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', angularURL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', corsMethods);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', corsHeaders);

    next();
}
