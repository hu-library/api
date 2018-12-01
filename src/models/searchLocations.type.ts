export type SearchLocation =
'Home' |
'Reshelving Carts' |
'Surrounding Area' |
'Circulation Desk' |
'Bestsellers' |
'Reference' |
'Reserve' |
'Christian Fiction' |
'Juvenile / EZ JUV' |
'Entire Section' |
'Switched Letters' |
'Number Mistakes' |
'Brewer Collection' |
'Mending/Relettering';

export function parseLocation(location: string) {
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
