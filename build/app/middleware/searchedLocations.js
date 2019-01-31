"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../config/index");
const _1 = require("./");
const columns_1 = require("../../models/columns");
const searchLocations_type_1 = require("../../models/searchLocations.type");
function getBook(req, res, next, callNumber) {
    console.log(callNumber);
    for (const book of _1.books) {
        if (callNumber === book.getCallNumber().replace(/ /g, '-')) {
            res.locals.book = book.getRowNumber();
            res.locals.status = book.getStatus();
            res.locals.searchCount = book.getSearchCount();
        }
    }
    next();
}
exports.getBook = getBook;
function getAcronymsArrayAsString(locations) {
    if (!locations) {
        return '';
    }
    const array = [];
    for (const loc of locations) {
        array.push(searchLocations_type_1.createLocationAcronym(loc));
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
function updateSearchedLocation(req, res) {
    const locations = getAcronymsArrayAsString(req.body.locations);
    if (res.locals.book && locations !== '') {
        const data = [[locations]];
        index_1.sheetsAPI.setData(data, {
            majorDimension: 'COLUMNS',
            range: {
                startCol: columns_1.columns.searchLocations + 1,
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
    else {
        res.status(404).json({
            error: 'Book not found',
            code: 404
        });
    }
}
exports.updateSearchedLocation = updateSearchedLocation;
//# sourceMappingURL=searchedLocations.js.map