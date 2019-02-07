"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_sheets_manager_1 = require("google-sheets-manager");
const credentials_1 = __importDefault(require("./credentials"));
exports.serverPort = process.env.PORT || 8000;
exports.logFormat = 'dev';
const spreadsheetID = '1HgFqak5AUZBnSCHBkKvKiGsHw8TEq7MVLWdW5SP6Eks';
const mainSheetID = 1128497297;
const inventorySheetID = 772169066;
exports.authClass = new google_sheets_manager_1.ServiceAccount(credentials_1.default);
exports.authClass.ensureValid((err, res) => {
    if (err) {
        console.log(`ERROR -- ${err}`);
        // throw err;
    }
});
exports.sheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, mainSheetID);
exports.inventorySheetAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, inventorySheetID);
exports.subjectStart = 'Library book searching bot: ';
//# sourceMappingURL=index.js.map