"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const book_model_1 = require("../../models/book.model");
exports.books = [];
function setBooks(req, res, next) {
    config_1.sheetsAPI.getData((error, response) => {
        if (error) {
            res.status(404).json({
                error,
                message: 'error exists'
            });
        }
        else if (response) {
            addBooks(response);
            next();
        }
        else {
            res.status(404).json({
                error,
                response,
                message: 'error and response do not exist'
            });
        }
    });
}
exports.setBooks = setBooks;
function getAllRows(req, res) {
    res.status(200).json(parseRows());
}
exports.getAllRows = getAllRows;
function addBooks(rawRows) {
    exports.books = [];
    for (let i = 0; i < rawRows.length; i++) {
        const row = rawRows[i];
        if (row !== rawRows[0] && row !== rawRows[1] && checkRow(row)) {
            exports.books.push(new book_model_1.Book(row, i));
        }
    }
}
function checkRow(row) {
    for (const s of row) {
        if (s && s.trim() !== '') {
            return true;
        }
    }
    return false;
}
function parseRows() {
    const result = [];
    for (const book of exports.books) {
        result.push(book.toJSON());
    }
    return result;
}
//# sourceMappingURL=index.js.map