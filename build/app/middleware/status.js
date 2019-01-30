"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/");
const columns_1 = require("../../models/columns");
function checkStatus(status) {
    if (!status) {
        return '';
    }
    else {
        status = status.trim();
        if (status === 'Found' ||
            status === 'Stop searching' ||
            status === 'Recordkeeping/Withdrawals' ||
            status === 'Not searched for yet' ||
            status === 'Began searching') {
            return status;
        }
        else {
            return '';
        }
    }
}
function updateBookStatus(req, res) {
    const status = checkStatus(req.body.status);
    if (res.locals.book && status !== '') {
        if (res.locals.searchCount || res.locals.searchCount === 0) {
            const searchCount = [[res.locals.searchCount + 1]];
            console.log('searchCount is ', res.locals.searchCount);
            config_1.sheetsAPI.setData(searchCount, {
                majorDimension: 'COLUMNS',
                range: {
                    startCol: columns_1.columns.searchCount + 1,
                    startRow: res.locals.book + 1
                }
            }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    updateSearchStatus();
                }
            });
        }
        else {
            updateSearchStatus();
        }
    }
    else {
        res.status(404).json({
            error: 'Book not found',
            code: 404
        });
    }
    function updateSearchStatus() {
        const data = [[status]];
        config_1.sheetsAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol: columns_1.columns.searchStatus + 1,
                startRow: res.locals.book + 1
            },
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.status(404).json(err);
            }
            else if (response) {
                res.status(200).json(response);
            }
        });
    }
}
exports.updateBookStatus = updateBookStatus;
//# sourceMappingURL=status.js.map