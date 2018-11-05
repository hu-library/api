import { NextFunction, Request, Response } from 'express';
import { sheetsAPI } from '../../config';
import { Book } from '../../models/book.model';
import { SearchStatus } from '../../models/searchstatus.enum';

// #region Row definitions
// const SEARCH_STATUS_ROW_ONE = 0;
// const SEARCH_STATUS_ROW_TWO = 1;
const URGENCY_ROW = 2;
const TYPE_ROW = 3;
const CALL_NUMBER_ROW = 4;
const TITLE_ROW = 5;
const AUTHOR_ROW = 6;
const PATRON_NAME_ROW = 7;
const TIMESTAMP_ROW = 8;
const PATRON_EMAIL_ROW = 10;
const PATRON_HNUMBER_ROW = 11;
const DATE_NO_LONGER_NEEDED_ROW = 12;
const CHECKBOX_ONE_ROW = 13;
// const LIBRARY_WORKER_NAME_ROW = 14;
const REPLACEMENT_RECOMMENDED_ROW = 15;
const PLACE_HOLD_ROW = 16;
// const ILL_EXPLAINED_ROW = 17;
const ELECTRONIC_COPY_ROW = 18;
const CHECKBOX_TWO_ROW = 19;

const STATUS_ROW = 20;
// #endregion

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
    let row = 2;
    while (rawRows[row][CALL_NUMBER_ROW]) {
        const newBook: Book = new Book();

        newBook.setUrgency(rawRows[row][URGENCY_ROW]);
        newBook.setType(rawRows[row][TYPE_ROW]);
        newBook.setPatronInfo(rawRows[row][PATRON_NAME_ROW],
            rawRows[row][PATRON_EMAIL_ROW], rawRows[row][PATRON_HNUMBER_ROW]);
        newBook.checkIfAnyApply(rawRows[row][CHECKBOX_ONE_ROW]);
        newBook.setElectronicCopy(rawRows[row][ELECTRONIC_COPY_ROW]);
        newBook.checkIfOnReserveOrBelievedReturned(rawRows[row][CHECKBOX_TWO_ROW]);
        newBook.setDateNoLongerNeeded(rawRows[row][DATE_NO_LONGER_NEEDED_ROW]);

        newBook.searchStatus = rawRows[row][STATUS_ROW] as SearchStatus;

        newBook.callNumber = rawRows[row][CALL_NUMBER_ROW];
        newBook.title = rawRows[row][TITLE_ROW];
        newBook.author = rawRows[row][AUTHOR_ROW];
        newBook.timestamp = new Date(rawRows[row][TIMESTAMP_ROW]);
        newBook.recommendReplacement = rawRows[row][REPLACEMENT_RECOMMENDED_ROW].includes('Yes');
        newBook.placeHold = rawRows[row][PLACE_HOLD_ROW].includes('Yes');

        books.push(newBook);
        row++;
    }

    return books;
}
