import { SearchStatus } from './searchstatus.enum';
import { ItemType } from './itemType.enum';
import { Patron } from './patron.model';
import { ElectronicCopy } from './electronicCopy.type';
import { Urgency } from './urgency.type';
import * as fromPatron from './fromPatron';
import * as fromVoyager from './fromVoyager';

export class Book {
    public callNumber?: string;
    private searchStatus?: SearchStatus;
    private urgency?: Urgency;
    private type?: ItemType;
    private title?: string;
    private author?: string;
    private patron?: Patron;
    private timestamp?: Date;
    private dateNoLongerNeeded?: Date;
    private requiredForClass?: boolean;
    private requiredForSeminar?: boolean;
    private recommendedByProfessor?: boolean;
    private requestedButNotRequired?: boolean;
    private recommendReplacement?: boolean;
    private placeHold?: boolean;
    private electronicCopy?: ElectronicCopy;
    private markedLostBelievedReturned?: boolean;
    private listedOnReserve?: boolean;

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
    public setSearchStatus(status?: SearchStatus) {
        if (status) {
            this.searchStatus = status;
        } else {
            this.searchStatus = 'Began searching';
        }
    }

    public setUrgency(urgency: string) {
        this.urgency = urgency as unknown as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    }

    public setType(typeToSet: string) {
        this.type = typeToSet as unknown as ItemType;
    }

    public checkIfAnyApply(column: string) {
        this.requiredForClass = column.includes(fromPatron.requiredForClass);
        this.requiredForSeminar = column.includes(fromPatron.requiredForSeminar);
        this.recommendedByProfessor = column.includes(fromPatron.recommendedByProfessor);
        this.requestedButNotRequired = column.includes(fromPatron.requestedButNotRequired);
    }

    public checkIfOnReserveOrBelievedReturned(column: string) {
        this.markedLostBelievedReturned = column.includes(fromVoyager.markedLostBelievedReturned);
        this.listedOnReserve = column.includes(fromVoyager.listedOnReserve);
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
