import { SearchStatus } from './searchstatus.enum';
import { SearchNotes } from './searchNotes.model';
import { ItemType } from './itemType.enum';
import { Patron } from './patron.model';

export interface Row {
    searchStatus: SearchStatus;
    searchNotes: SearchNotes[];
    urgency: 0|1|2|3|4|5|6|7|8|9|10;
    type: ItemType;
    callNumber: string;
    title: string;
    author: string; // might could made into another interface
    patronInfo: Patron;
    timestamp: Date;
    dateNoLongerNeeded: Date;
    requiredForClass: boolean;
    requiredForSeminar: boolean;
    recommendedByProfessor: boolean;
    requestedButNotRequired: boolean;
    libraryWorker: string;
    recommendReplacement: boolean;
    placeHold: boolean;
    explainedILLs: boolean;
    electronicCopy: 'Yes' | 'No' | 'Unknown/Not Applicable';
    markedLostBelievedReturned: boolean;
    listedOnReserve: boolean;
}
