import {Row} from './row.model';
import { SearchStatus } from './searchstatus.enum';
import { SearchNotes } from './searchNotes.model';
import { ItemType } from './itemType.enum';
import { Patron } from './patron.model';

export class Book implements Row {
    public searchStatus: SearchStatus;
    // public searchNotes: SearchNotes[];
    public urgency: 0|1|2|3|4|5|6|7|8|9|10;
    public type: ItemType;
    public callNumber: string;
    public title: string;
    public author: string; // might could made into another interface
    // public patronInfo: Patron;
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
        this.searchStatus = 1;
        // this.searchNotes = new SearchNotes;
        this.urgency = 0;
        this.type = 1;
        this.callNumber = '';
        this.title = '';
        this.author = '';
        // this.patronInfo = new Patron();
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
}
