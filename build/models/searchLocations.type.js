"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseLocation(location) {
    switch (location && location.trim().toUpperCase()) {
        case 'HM': return 'Home';
        case 'RC': return 'Reshelving Carts';
        case 'SA': return 'Surrounding Area';
        case 'CD': return 'Circulation Desk';
        case 'BS': return 'Bestsellers';
        case 'RF': return 'Reference';
        case 'RS': return 'Reserve';
        case 'CF': return 'Christian Fiction';
        case 'JU': return 'Juvenile / EZ JUV';
        case 'ES': return 'Entire Section';
        case 'SL': return 'Switched Letters';
        case 'NM': return 'Number Mistakes';
        case 'BC': return 'Brewer Collection';
        case 'MR': return 'Mending/Relettering';
        default: return 'Home';
    }
}
exports.parseLocation = parseLocation;
function createLocationAcronym(location) {
    switch (location) {
        case 'Home': return 'HM';
        case 'Reshelving Carts': return 'RC';
        case 'Surrounding Area': return 'SA';
        case 'Circulation Desk': return 'CD';
        case 'Bestsellers': return 'BS';
        case 'Reference': return 'RF';
        case 'Reserve': return 'RS';
        case 'Christian Fiction': return 'CF';
        case 'Juvenile / EZ JUV': return 'JU';
        case 'Entire Section': return 'ES';
        case 'Switched Letters': return 'SL';
        case 'Number Mistakes': return 'NM';
        case 'Brewer Collection': return 'BC';
        case 'Mending/Relettering': return 'MR';
        default: return 'HM';
    }
}
exports.createLocationAcronym = createLocationAcronym;
//# sourceMappingURL=searchLocations.type.js.map