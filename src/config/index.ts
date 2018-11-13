import { GoogleSheet, ServiceAccount } from 'google-sheets-manager';
import * as creds from './credentials.json';
export const serverPort = 8000;
export const logFormat = 'dev';
const spreadsheetID = '1HgFqak5AUZBnSCHBkKvKiGsHw8TEq7MVLWdW5SP6Eks';
const mainSheetID = 1128497297;
const colorKeySheetID = 539679140;
const attributeSheetID = 1037601079;

export const authClass = new ServiceAccount(creds);
export const sheetsAPI = new GoogleSheet(authClass, spreadsheetID, mainSheetID);

export const angularURL  = 'http://localhost:4200';
export const corsMethods = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
export const corsHeaders = 'X-Requested-With,Content-Type';

export const defaultCallbackForAPI = (err: any, res: any) => {
    if (err) {
        console.log(`ERROR -- ${err}`);
        throw err;
    }
    console.log(res);
};

export const pageTwoSheetsAPI = new GoogleSheet(authClass, spreadsheetID, colorKeySheetID);
