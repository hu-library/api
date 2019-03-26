import { Request, Response, NextFunction } from 'express';
import { inventorySheetAPI } from '../../config';
import { InventoryBook } from '../../models/inventory.model';
import { resolveSoa } from 'dns';

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
    return (row[0].trim() !== '' && row[1].trim() !== '');
}

function parseRows() {
    const result = [];
    for (const book of inventoryBooks) {
        result.push(book.toJSON());
    }
    return result;
}

export function getInventoryBook(req: Request, res: Response, next: NextFunction, barcode: string) {
    for (const book of inventoryBooks) {
        if (book.getBarcode() === Number.parseInt(barcode)) {
            res.locals.book = book;
        }
    }
    next();
}

export function addSearchLocations(req: Request, res: Response, next: NextFunction) {
    if (req.body.locations && res.locals.book) {
        const data = [ [ req.body.locations ] ];
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
    }
    else {
        res.send('else');
    }
}