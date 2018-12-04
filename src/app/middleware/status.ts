import { Request, Response } from 'express';
import { sheetsAPI } from '../../config/';
import { columns } from '../../models/columns';
import { books } from '.';

function checkStatus(status: string) {
    if (!status) {
        return '';
    } else {
        status = status.trim();
        if (status === 'Found' ||
            status === 'Stop searching' ||
            status === 'Recordkeeping/Withdrawals' ||
            status === 'Not searched for yet' ||
            status === 'Began searching') {
                return status;
            } else {
                return '';
            }
    }
}

// function updateBooks(update: number, status: string) {
//     for (const book of books) {
//         if (book.getRowNumber() === update) {
//             book.updateSearchStatus(status);
//             return;
//         }
//     }
// }

export function updateBookStatus(req: Request, res: Response) {
    const status = checkStatus(req.body.status);
    console.log(req.body.status);
    if (res.locals.book && status !== '') {
        const data = [ [ status ] ];
        sheetsAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol: columns.searchStatus + 1,
                startRow: res.locals.book + 1
            },
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(404).json(err);
            } else if (response) {
                // updateBooks(res.locals.book, status);
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
