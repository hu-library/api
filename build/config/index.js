"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_sheets_manager_1 = require("google-sheets-manager");
const creds = __importStar(require("./credentials.json"));
exports.serverPort = 8000;
exports.logFormat = 'dev';
exports.backendURL = `http://localhost:${exports.serverPort}/`;
const spreadsheetID = '1HgFqak5AUZBnSCHBkKvKiGsHw8TEq7MVLWdW5SP6Eks';
const mainSheetID = 1128497297;
const colorKeySheetID = 539679140;
const attributeSheetID = 1037601079;
exports.authClass = new google_sheets_manager_1.ServiceAccount(creds);
exports.sheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, mainSheetID);
exports.defaultCallbackForAPI = (err, res) => {
    if (err) {
        console.log(`ERROR -- ${err}`);
        throw err;
    }
    console.log(res);
};
exports.pageTwoSheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, colorKeySheetID);
exports.attributeSheetsAPI = new google_sheets_manager_1.GoogleSheet(exports.authClass, spreadsheetID, attributeSheetID);
exports.subjectStart = 'Library book searching bot: ';
//# sourceMappingURL=index.js.map