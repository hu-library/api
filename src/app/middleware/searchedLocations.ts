import { Request, Response, NextFunction } from 'express';
import { sheetsAPI } from '../../config/index';
import { books } from './';
import { columns } from '../../models/columns';
import { createLocationAcronym, SearchLocation } from '../../models/searchLocations.type';
export function getBook(req: Request, res: Response, next: NextFunction, callNumber: string) {
    for (const book of books) {
        if (callNumber === book.getCallNumber().replace(/ /g, '-')) {
            res.locals.book = book.getRowNumber();
        }
    }
    next();
}

function getAcronymsArrayAsString(locations: SearchLocation[]) {
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

export function updateSearchedLocation(req: Request, res: Response) {
    console.log(res.locals.book);
    const locations = getAcronymsArrayAsString(req.body.locations);
    console.log(locations);
    if (res.locals.book && req.body.locations) {
        const data = [ [ locations ] ];
        sheetsAPI.setData(data,  {
            majorDimension: 'COLUMNS',
            range: {
                startCol: columns.searchLocations + 1,
                startRow: res.locals.book + 1
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
            error: 'Book not found',
            code: 404
        });
    }
}
