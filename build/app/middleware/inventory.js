"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const inventory_model_1 = require("../../models/inventory.model");
const inventoryBooks = [];
function setInventory(req, res, next) {
    config_1.inventorySheetAPI.getData((err, response) => {
        if (err) {
            console.log(err);
            res.status(404).json(err);
        }
        else if (response) {
            addBooks(response);
        }
    });
}
exports.setInventory = setInventory;
function getInventory(req, res) {
    res.status(200).json(parseRows());
}
exports.getInventory = getInventory;
function addBooks(response) {
    while (inventoryBooks.length > 0) {
        inventoryBooks.pop();
    }
    for (const row of response) {
        if (row !== response[0] && checkRow(row)) {
            inventoryBooks.push(new inventory_model_1.InventoryBook(row));
        }
    }
}
function checkRow(row) {
    return (row[0].trim() !== '' && row[1].trim() !== '');
}
function parseRows() {
    const result = [];
    for (const book of inventoryBooks) {
        result.push(book.toJSON());
    }
    return result;
}
//# sourceMappingURL=inventory.js.map