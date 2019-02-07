"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InventoryBook {
    constructor(row) {
        this.location = row[0].trim();
        this.callNumber = row[1].trim().replace(/ /g, '-');
        this.title = row[2].trim();
        this.barcode = Number(row[3].trim());
        this.status = row[4].trim();
        this.lastSeen = new Date(row[5].trim());
        this.tempLocation = row[6].trim();
        this.createDate = new Date(row[7].trim());
    }
    toJSON() {
        return {
            location: this.location,
            callNumber: this.callNumber,
            title: this.title,
            barcode: this.barcode,
            status: this.status,
            lastSeen: this.lastSeen.toLocaleDateString(),
            tempLocation: this.tempLocation,
            createDate: this.createDate.toLocaleDateString()
        };
    }
}
exports.InventoryBook = InventoryBook;
const inventoryColumns = {
    location: 0,
    callNumber: 1,
    title: 2,
    barcode: 3,
    status: 4,
    lastSeen: 5,
    tempLocation: 6,
    createDate: 7
};
//# sourceMappingURL=inventory.model.js.map