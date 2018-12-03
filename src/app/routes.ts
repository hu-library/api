import { Router } from 'express';

import * as sheet from './middleware';
import * as email from './middleware/email';
import * as location from './middleware/searchedLocations';

export const router = Router();

sheet.setBooks();

router.get('/', sheet.getAllRows);
router.get('/write', sheet.writeAllRows);
router.post('/email', email.sendMail);

router.param('location', location.getBook);
router.post('/searched/:location', location.updateSearchedLocation);
