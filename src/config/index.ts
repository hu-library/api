import { GoogleSheet, ServiceAccount } from 'google-sheets-manager';
import creds from './credentials';
export const serverPort = process.env.PORT || 8000;
export const logFormat = 'dev';

const spreadsheetID = '1HgFqak5AUZBnSCHBkKvKiGsHw8TEq7MVLWdW5SP6Eks';
const mainSheetID = 1128497297;
const inventorySheetID = 772169066;
const missingInventorySheetID = 1483712611;

export const authClass = new ServiceAccount(creds);
authClass.ensureValid((err, res) => {
    if (err) {
        console.log(`ERROR -- ${err}`);
        // throw err;
    }
});
export const sheetsAPI = new GoogleSheet(authClass, spreadsheetID, mainSheetID);
export const inventorySheetAPI = new GoogleSheet(authClass, spreadsheetID, inventorySheetID);
export const missingInventoryAPI = new GoogleSheet(authClass, spreadsheetID, missingInventorySheetID);

export const subjectStart = 'Library book searching bot: ';
