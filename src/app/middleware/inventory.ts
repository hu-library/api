import { Request, Response, NextFunction } from 'express';
import { inventorySheetAPI } from '../../config';
import { InventoryBook } from '../../models/inventory.model';

const inventoryBooks: InventoryBook[] = [];

export function setInventory(req: Request, res: Response, next: NextFunction) {
    inventorySheetAPI.getData((err, response) => {
        if (err) {
            console.log(err);
            res.status(404).json(err);
        } else if (response) {
            addBooks(response);
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
            inventoryBooks.push(new InventoryBook(row));
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
