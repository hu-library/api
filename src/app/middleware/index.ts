import { NextFunction, Request, Response } from 'express';
import { sheetsAPI, attributeSheetsAPI } from '../../config';
import { Book } from '../../models/book.model';
import * as rowMap from '../../models/rows';

const books: Book[] = [];

export function setBooks() {
    sheetsAPI.getData((error, response) => {
        if (error) {
            console.log(error);
        } else if (response) {
            addBooks(response);
        } else {
            console.log({
                error,
                response
            });
        }
    });
}

export function getAllRows(req: Request, res: Response, next: NextFunction) {
    res.status(200).json(parseRows());
}

export function writeAllRows(req: Request, res: Response, next: NextFunction) {
    // sorted by column then row
    const data = [['1'] , ['2'], ['3'], ['4']];
    attributeSheetsAPI.setData(data, {
        majorDimension: 'COLUMNS',
        range: {
            startCol: 1,
            startRow: 2
        },
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.status(404).json(err);
        } else if (response) {
            res.status(200).json(response);
        }
    });
}

function addBooks(rawRows: string[][]): void {
    for (let i = 0; i < rawRows.length; i++) {
        const row = rawRows[i];
        if (row !== rawRows[0] && row !== rawRows[1] && checkRow(row)) {
            books.push(new Book(row, i));
        }
    }
}

function checkRow(row: string[]): boolean {
    for (const s of row) {
        if (s && s.trim() !== '') {
            return true;
        }
    }
    return false;
}

function parseRows(): JSON[] {
    const result: JSON[] = [];
    for (const book of books) {
        result.push(book.toJSON());
    }
    return result;
}
