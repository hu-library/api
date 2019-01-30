"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_sheets_manager_1 = require("google-sheets-manager");
const credentials_1 = __importDefault(require("./credentials"));
exports.serverPort = process.env.PORT || 8000;
exports.logFormat = 'dev';
exports.backendURL = `http://localhost:${exports.serverPort}/`;
const spreadsheetID = '1HgFqak5AUZBnSCHBkKvKiGsHw8TEq7MVLWdW5SP6Eks';
const mainSheetID = 1128497297;
const colorKeySheetID = 539679140;
const attributeSheetID = 1037601079;
exports.authClass = new google_sheets_manager_1.ServiceAccount(credentials_1.default);
exports.authClass.ensureValid((err, res) => {
    if (err) {
        console.log(`ERROR -- ${err}`);
        // throw err;
    }
    else {
        console.log(res);
    }
});
exports.sheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, mainSheetID);
exports.pageTwoSheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, colorKeySheetID);
exports.attributeSheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, attributeSheetID);
exports.subjectStart = 'Library book searching bot: ';
//# sourceMappingURL=index.js.map