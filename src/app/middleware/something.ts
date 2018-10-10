import { Request, Response, NextFunction } from 'express';

export function doSomething(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
        status: 200,
        body: 'Here is a valid response'
    });
}
