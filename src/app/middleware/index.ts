import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';
import { Book } from '../../models/book.model';

export let books: Book[] = [];

export function setBooks(req: Request, res: Response, next: NextFunction) {
    sheetsAPI.getData((error, response) => {
        if (error) {
            res.status(404).json({
                error,
                message: 'error exists'
            });
        } else if (response) {
            addBooks(response);
            next();
        } else {
            res.status(404).json({
                error,
                response,
                message: 'error and response do not exist'
            });
        }
    });
}

export function getAllRows(req: Request, res: Response) {
    res.status(200).json(parseRows());
}

function addBooks(rawRows: string[][]) {
    books = [];
    for (let i = 0; i < rawRows.length; i++) {
        const row = rawRows[i];
        if (row !== rawRows[0] && row !== rawRows[1] && checkRow(row)) {
            books.push(new Book(row, i));
        }
    }
}

function checkRow(row: string[]) {
    for (const s of row) {
        if (s && s.trim() !== '') {
            return true;
        }
    }
    return false;
}

function parseRows() {
    const result = [];
    for (const book of books) {
        result.push(book.toJSON());
    }
    return result;
}
