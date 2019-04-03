import { Request, Response, NextFunction } from 'express';
import { inventorySheetAPI, missingInventoryAPI } from '../../config';
import { InventoryBook } from '../../models/inventory.model';
import { SearchLocation, createLocationAcronym } from '../../models/searchLocations.type';

const inventoryBooks: InventoryBook[] = [];

const startCol = 10;

export function setInventory(req: Request, res: Response, next: NextFunction) {
    inventorySheetAPI.getData((err, response) => {
        if (err) {
            console.log(err);
            res.status(404).json(err);
        } else if (response) {
            addBooks(response);
            next();
        }
    });
}

export function getInventory(req: Request, res: Response) {
    res.status(200).json(parseRows());
}

function addBooks(response: string[][]) {
    while (inventoryBooks.length > 0) { inventoryBooks.pop(); }
    for (const row of response) {
        if (row !== response[0] && checkRow(row)) {
            inventoryBooks.push(new InventoryBook(row, response.indexOf(row)));
        }
    }
}

function checkRow(row: string[]) {
    return (row[0].trim() !== '' && row[1].trim() !== '' && !row[10]);
}

function parseRows() {
    const result = [];
    for (const book of inventoryBooks) {
        result.push(book.toJSON());
    }
    return result;
}

function getBookByCallNumber(callNumber: string) {
    for (const book of inventoryBooks) {
        if (book.getCallNumber() === callNumber) {
            return book;
        }
    }
    return null;
}

export function getInventoryBook(req: Request, res: Response, next: NextFunction, callNumber: string) {
    callNumber = callNumber.replace(/\s+/g, ' ');
    const book = getBookByCallNumber(callNumber);
    if (book) {
        res.locals.book = book;
    }
    next();
}

function getAcronymsArrayAsString(locations: SearchLocation[]) {
    if (!locations) {
        return '';
    }
    const array = [];
    for (const loc of locations) {
        array.push(createLocationAcronym(loc));
    }
    array.sort();
    let result = '';
    for (const loc of array) {
        if (loc !== 'HM') {
            result += loc + ', ';
        }
    }
    result = result.substring(0, result.length - 2);
    return result;
}

export function addSearchLocations(req: Request, res: Response) {
    const locations = getAcronymsArrayAsString(req.body.locations);
    if (locations !== '' && res.locals.book) {
        const data = [[locations]];
        const startRow = res.locals.book.getRowNumber() + 1;
        inventorySheetAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol,
                startRow
            },
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(404).json(err);
            } else if (response) {
                res.status(200).json(response);
            }
        });
    } else {
        res.status(404).json({
            error: 'Inventory book not found',
            code: 404
        });
    }
}

export function bookFound(req: Request, res: Response) {
    if (req.body.book && res.locals.book) {
        const data = [ [ 'Found' ] ];
        const startRow = res.locals.book.getRowNumber() + 1;
        inventorySheetAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol: 11,
                startRow
            }
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(404).json(err);
            } else if (response) {
                res.status(200).json(response);
            }
        });
    } else {
        res.status(404).json({
            error: 'Inventory book not found',
            code: 404
        });
    }
}

export function getInventoryRowAndBook(req: Request, res: Response, next: NextFunction, callNumber: string) {
    callNumber = callNumber.replace(/\s+/g, ' ');
    missingInventoryAPI.getData((err, response) => {
        if (err) {
            res.status(404).json(err);
        } else if (response) {
            let count = 0;
            for (const item of response) {
                if (item && item[0] && item[0] !== '' && item !== response[0]) { count++; }
            }
            res.locals.count = count;
            const book = getBookByCallNumber(callNumber);
            if (book) {
                res.locals.book = book;
            }
            next();
        }
    });
}

export function addBookToMissing(req: Request, res: Response) {
    if (req.body.book && res.locals.book) {
        const startRow = res.locals.count + 2; // Adding 2 one for title row, one because sheets' index starts at 1
        const data = [[res.locals.book.getCallNumber().replace(/-/g, ' ')], [res.locals.book.getTitle()], [res.locals.book.getBarcode()]];
        missingInventoryAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol: 0,
                startRow
            }
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(404).json(err);
            } else if (response) {
                res.status(200).json(response);
            }
        });
    } else {
        res.status(404).json({
            error: 'Book not found',
            code: 404
        });
    }
}
