import {Row} from './row.model';
import { SearchStatus } from './searchstatus.enum';
import { SearchNotes } from './searchNotes.model';
import { ItemType } from './itemType.enum';
import { Patron } from './patron.model';

const requiredForClass = 'Is the item a REQUIRED text for a current class?';
const requiredForSeminar = 'Is the item required for a Senior Seminar/Capstone?';
const recommendedByProfessor = 'Is the item recommended by the professor but NOT REQUIRED for use in the current term?';
const requestedButNotRequired = 'Is the item requested but NOT REQUIRED for use in the current term?';
const markedLostBelievedReturned =
    'The item has been marked as LOST in Voyager, but the patron believes they have returned it.';
const listedOnReserve = 'The item is listed as ON RESERVE';

export class Book implements Row {
    public searchStatus: SearchStatus;
    // public searchNotes: SearchNotes[];
    public urgency: 0|1|2|3|4|5|6|7|8|9|10;
    public type: ItemType;
    public callNumber: string;
    public title: string;
    public author: string; // might could made into another interface
    public patron: Patron;
    public timestamp: Date;
    public dateNoLongerNeeded: Date;
    public requiredForClass: boolean;
    public requiredForSeminar: boolean;
    public recommendedByProfessor: boolean;
    public requestedButNotRequired: boolean;
    public recommendReplacement: boolean;
    public placeHold: boolean;
    public electronicCopy: 'Yes' | 'No' | 'Unknown/Not Applicable';
    public markedLostBelievedReturned: boolean;
    public listedOnReserve: boolean;

    constructor() {
        this.searchStatus = 'Began searching';
        // this.searchNotes = new SearchNotes;
        this.urgency = 0;
        this.type = 1;
        this.callNumber = '';
        this.title = '';
        this.author = '';
        this.patron = {};
        this.timestamp = new Date();
        this.dateNoLongerNeeded = new Date();
        this.requiredForClass = false;
        this.requiredForSeminar = false;
        this.recommendedByProfessor = false;
        this.requestedButNotRequired = false;
        this.recommendReplacement = false;
        this.placeHold = false;
        this.electronicCopy = 'No';
        this.markedLostBelievedReturned = false;
        this.listedOnReserve = false;
    }

    public setUrgency(urgency: string) {
        this.urgency = urgency as unknown as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    }

    public setType(typeToSet: string) {
        this.type = typeToSet as unknown as ItemType;
    }

    public checkIfAnyApply(column: string) {
        this.requiredForClass = column.includes(requiredForClass);
        this.requiredForSeminar = column.includes(requiredForSeminar);
        this.recommendedByProfessor = column.includes(recommendedByProfessor);
        this.requestedButNotRequired = column.includes(requestedButNotRequired);
    }

    public checkIfOnReserveOrBelievedReturned(column: string) {
        this.markedLostBelievedReturned = column.includes(markedLostBelievedReturned);
        this.listedOnReserve = column.includes(listedOnReserve);
    }

    public setPatronInfo(name: string, email: string, hNumber: string) {
        this.patron.email = email;
        this.patron.name = name;
        this.patron.hNumber = hNumber;
    }

    public setElectronicCopy(elecronicCopy: string) {
        this.electronicCopy = elecronicCopy as unknown as 'Yes' | 'No' | 'Unknown/Not Applicable';
    }

    public setDateNoLongerNeeded(date: string) {
        const myDate = date.split('/');
        const year = Number.parseInt(myDate[2], 10);
        const month = Number.parseInt(myDate[0], 10) + 1;
        const day = Number.parseInt(myDate[1], 10);

        this.dateNoLongerNeeded = new Date(year, month, day);
    }
}
