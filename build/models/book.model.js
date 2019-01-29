"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fromPatron = __importStar(require("./fromPatron"));
const fromVoyager = __importStar(require("./fromVoyager"));
const columns_1 = require("./columns");
const searchLocations_type_1 = require("./searchLocations.type");
class Book {
    constructor(row, rowNumber) {
        this.author = row[columns_1.columns.author];
        this.callNumber = row[columns_1.columns.callNumber];
        this.title = row[columns_1.columns.title];
        this.listedOnReserve = this.ListedOnReserve(row[columns_1.columns.onReserve]);
        this.markedLostBelievedReturned = this.BelievedReturned(row[columns_1.columns.believedReturned]);
        this.placeHold = this.PlaceHold(row[columns_1.columns.placeHold]);
        this.recommendedByProfessor = this.RecommendedByProfessor(row[columns_1.columns.byProfessor]);
        this.recommendReplacement = this.RecommendReplacement(row[columns_1.columns.replacementNeeded]);
        this.requestedButNotRequired = this.RequestedButNotRequired(row[columns_1.columns.notRequired]);
        this.requiredForClass = this.RequiredForClass(row[columns_1.columns.forClass]);
        this.requiredForSeminar = this.RequiredForSeminar(row[columns_1.columns.forSeminar]);
        this.timestamp = this.Timestamp(row[columns_1.columns.timestamp]);
        this.dateNoLongerNeeded = this.DateNoLongerNeeded(row[columns_1.columns.dateNotNeeded]);
        this.electronicCopy = this.ElectronicCopy(row[columns_1.columns.electronicCopy]);
        this.type = this.Type(row[columns_1.columns.bookType]);
        this.patron = this.PatronInfo(row);
        this.searchStatus = this.SearchStatus(row[columns_1.columns.searchStatus]);
        this.urgency = this.Urgency(row[columns_1.columns.urgency]);
        this.searchCount = this.SearchCount(row[columns_1.columns.searchCount]);
        this.searchedLocations = this.SearchedLocations(row[columns_1.columns.searchLocations]);
        this.rowNumber = rowNumber;
    }
    toJSON() {
        const obj = new Object();
        for (const prop in this) {
            if (prop && prop !== 'searchedLocation') {
                obj[prop] = this[prop];
                if (prop === 'timestamp') {
                    obj[prop] = this[prop].toLocaleString();
                }
                else if (prop === 'dateNoLongerNeeded') {
                    obj[prop] = this[prop].toLocaleString();
                }
            }
        }
        obj.searchedLocations = {};
        if (this.searchedLocations.size > 0) {
            for (const [k, v] of this.searchedLocations) {
                obj.searchedLocations[k] = v;
            }
        }
        return obj;
    }
    getSearchCount() {
        return this.searchCount;
    }
    getCallNumber() {
        return this.callNumber;
    }
    getRowNumber() {
        return this.rowNumber;
    }
    updateSearchStatus(status) {
        this.searchStatus = this.SearchStatus(status);
    }
    getStatus() {
        return this.searchStatus;
    }
    SearchedLocations(column) {
        const result = new Map();
        if (column && column.trim()) {
            const locations = column.split(', ');
            for (const loc of locations) {
                result.set(searchLocations_type_1.parseLocation(loc), true);
            }
        }
        return result;
    }
    SearchCount(column) {
        if (column && column.trim()) {
            this.searchCount = Number.parseInt(column.trim(), 10);
        }
        return 0;
    }
    RequiredForClass(column) {
        if (column && column.trim()) {
            this.requiredForClass = column.includes(fromPatron.requiredForClass);
        }
        return false;
    }
    RequiredForSeminar(column) {
        if (column && column.trim()) {
            this.requiredForSeminar = column.includes(fromPatron.requiredForSeminar);
        }
        return false;
    }
    RecommendedByProfessor(column) {
        if (column && column.trim()) {
            this.recommendedByProfessor = column.includes(fromPatron.recommendedByProfessor);
        }
        return false;
    }
    RequestedButNotRequired(column) {
        if (column && column.trim()) {
            this.requestedButNotRequired = column.includes(fromPatron.requestedButNotRequired);
        }
        return false;
    }
    ListedOnReserve(column) {
        if (column && column.trim()) {
            return column.includes(fromVoyager.listedOnReserve);
        }
        return false;
    }
    BelievedReturned(column) {
        if (column && column.trim()) {
            return column.includes(fromVoyager.markedLostBelievedReturned);
        }
        return false;
    }
    DateNoLongerNeeded(date) {
        if (date.trim()) {
            const myDate = date.split('/');
            const year = Number.parseInt(myDate[2], 10);
            const month = Number.parseInt(myDate[0], 10) + 1;
            const day = Number.parseInt(myDate[1], 10);
            return new Date(year, month, day);
        }
        else {
            return new Date();
        }
    }
    ElectronicCopy(electronicCopy) {
        if (electronicCopy.trim()) {
            return electronicCopy;
        }
        return 'No';
    }
    PlaceHold(placeHold) {
        if (placeHold.trim()) {
            return placeHold.includes('Yes');
        }
        return false;
    }
    PatronInfo(row) {
        if (row) {
            const email = row[columns_1.columns.patronEmail].trim();
            const name = row[columns_1.columns.patronName].trim();
            const hNumber = row[columns_1.columns.patronHNumber].trim();
            return {
                email,
                hNumber,
                name
            };
        }
        return {};
    }
    RecommendReplacement(recommendReplacement) {
        if (recommendReplacement.trim()) {
            return recommendReplacement.includes('Yes');
        }
        return false;
    }
    SearchStatus(status) {
        if (status.trim()) {
            return status;
        }
        return 'Began searching';
    }
    Timestamp(timestamp) {
        if (timestamp.trim()) {
            return new Date(timestamp);
        }
        return new Date();
    }
    Type(typeTo) {
        if (typeTo.trim()) {
            return typeTo;
        }
        return 'Bestsellers';
    }
    Urgency(urgency) {
        if (urgency.trim()) {
            return Number.parseInt(urgency, 10);
        }
        return 0;
    }
}
exports.Book = Book;
//# sourceMappingURL=book.model.js.map