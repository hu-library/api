import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';
import { Book } from '../../models/book.model';
import { SearchStatus } from '../../models/searchstatus.enum';

export function getAllRows(req: Request, res: Response, next: NextFunction) {
    sheetsAPI.getData((error, response) => {
        if (error) {
            res.status(404).json({
                code: 404,
                error
            });
        } else if (response) {
            res.send(JSON.stringify(parseRows(response)));
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

export function parseRows(rawRows: string[][]): JSON[] {
    const books: JSON[] = [];
    for (const row of rawRows) {
        if (row !== rawRows[0] && row !== rawRows[1]) {
            books.push(new Book(row).toJSON());
        }
    }
    return books;
}
