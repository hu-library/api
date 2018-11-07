import { SearchStatus } from './searchstatus.enum';
import { ItemType } from './itemType.type';
import { Patron } from './patron.model';
import { ElectronicCopy } from './electronicCopy.type';
import { Urgency } from './urgency.type';
import * as fromPatron from './fromPatron';
import * as fromVoyager from './fromVoyager';
import {
    URGENCY_ROW, TYPE_ROW, PATRON_NAME_ROW, PATRON_EMAIL_ROW,
    PATRON_HNUMBER_ROW, ELECTRONIC_COPY_ROW,
    DATE_NO_LONGER_NEEDED_ROW, STATUS_ROW, REPLACEMENT_RECOMMENDED_ROW,
    TIMESTAMP_ROW, PLACE_HOLD_ROW, CALL_NUMBER_ROW, TITLE_ROW,
    AUTHOR_ROW, LISTED_ON_RESERVE_ROW, BELIEVED_RETURNED_ROW
} from './rows';

export class Book {
    private listedOnReserve: boolean;
    private markedLostBelievedReturned: boolean;
    private placeHold: boolean;
    private recommendedByProfessor: boolean;
    private recommendReplacement: boolean;
    private requestedButNotRequired: boolean;
    private requiredForClass: boolean;
    private requiredForSeminar: boolean;
    private timestamp: Date;
    private dateNoLongerNeeded: Date;
    private electronicCopy: ElectronicCopy;
    private type: ItemType;
    private patron: Patron;
    private searchStatus: SearchStatus;
    private author: string;
    private callNumber: string;
    private title: string;
    private urgency: Urgency;

    constructor(row: string[]) {
        this.listedOnReserve = this.ListedOnReserve(row[LISTED_ON_RESERVE_ROW]);
        this.markedLostBelievedReturned = this.BelievedReturned(row[BELIEVED_RETURNED_ROW]);
        this.placeHold = this.PlaceHold(row[PLACE_HOLD_ROW]);
        this.recmo
    }

    private RequiredForClass(column: string): boolean {
        if (column) {
            this.requiredForClass = column.includes(fromPatron.requiredForClass);
        }
        return false;
    }

    private RequiredForSeminar(column: string): boolean {
        if (column) {
            this.requiredForSeminar = column.includes(fromPatron.requiredForSeminar);
        }
        return false;
    }

    private RecommendedByProfessor(column: string): boolean {
        if (column) {
            this.recommendedByProfessor = column.includes(fromPatron.recommendedByProfessor);
        }
        return false;
    }

    private RequestedButNotRequired(column: string): boolean {
        if (column) {
            this.requestedButNotRequired = column.includes(fromPatron.requestedButNotRequired);
        }
        return false;
    }

    private ListedOnReserve(column: string): boolean {
        if (column) {
            return column.includes(fromVoyager.listedOnReserve);
        }
        return false;
    }

    private BelievedReturned(column: string): boolean {
        if (column) {
            return column.includes(fromVoyager.markedLostBelievedReturned);
        }
        return false;
    }

    private DateNoLongerNeeded(date: string): Date {
        if (date) {
            const myDate = date.split('/');
            const year = Number.parseInt(myDate[2], 10);
            const month = Number.parseInt(myDate[0], 10) + 1;
            const day = Number.parseInt(myDate[1], 10);

            return new Date(year, month, day);
        } else {
            return new Date();
        }
    }

    private ElectronicCopy(electronicCopy: string): ElectronicCopy {
        if (electronicCopy) {
            return electronicCopy as unknown as ElectronicCopy;
        }
        return 'No';
    }

    private PlaceHold(placeHold: string): boolean {
        if (placeHold) {
            return placeHold.includes('Yes');
        }
        return false;
    }

    private PatronInfo(row: string[]): Patron {
        if (row) {
            const email = row[PATRON_EMAIL_ROW];
            const name = row[PATRON_NAME_ROW];
            const hNumber = row[PATRON_HNUMBER_ROW];
            return {
                email,
                hNumber,
                name
            };
        }
        return {};
    }

    private RecommendReplacement(recommendReplacement: string): boolean {
        if (recommendReplacement) {
            return recommendReplacement.includes('Yes');
        }
        return false;
    }

    private SearchStatus(status?: string): SearchStatus {
        if (status) {
            return status as SearchStatus;
        }
        return 'Began searching';
    }

    private Timestamp(timestamp: string) {
        if (timestamp) {
            return new Date(timestamp);
        }
        return new Date();
    }

    private Type(typeTo: string): ItemType {
        if (typeTo) {
            return typeTo as ItemType;
        }
        return 'Bestsellers';
    }

    private Urgency(urgency: string): Urgency {
        if (urgency) {
            return Number.parseInt(urgency, 10) as Urgency;
        }
        return 0;
    }
}
