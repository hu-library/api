import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';
import {Book} from '../../models/book.model';

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

export function parseRows(rawRows: string[][]): Book[] {
   const books: Book[] = [];
   for (let row = 2; row < 26; row++) {
       const newBook: Book = new Book();

       newBook.title = rawRows[row][5];
       newBook.callNumber = rawRows[row][4];
       newBook.author = rawRows[row][6];
       newBook.timestamp = new Date(rawRows[row][8]);
       newBook.dateNoLongerNeeded = new Date(rawRows[row][11]);
       books.push(newBook);
   }

   return books;
}
