import { Request, Response } from 'express';
import { sheetsAPI } from '../../config/';
import { columns } from '../../models/columns';

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

export function updateBookStatus(req: Request, res: Response) {
    const status = checkStatus(req.body.status);
    if (res.locals.book && status !== '') {
        if (res.locals.searchCount) {
            const searchCount = [[res.locals.searchCount + 1]];
            sheetsAPI.setData(searchCount, {
                majorDimension: 'COLUMNS',
                range: {
                    startCol: columns.searchCount,
                    startRow: res.locals.book + 1
                }
            }, (err) => {
                if (err) { console.log(err); }
            });
        }
        const data = [[status]];
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
