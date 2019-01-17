import { Request, Response, NextFunction } from 'express';

const angularURL = process.env.FRONTEND_URL || 'http://localhost:4200';
const corsMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
const corsHeaders = 'X-Requested-With,Content-Type';

export function allowCORS(req: Request, res: Response, next: NextFunction) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', angularURL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', corsMethods);

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', corsHeaders);

    next();
}
