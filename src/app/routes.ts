import { Router } from 'express';

import * as sheet from './middleware';
import * as email from './middleware/email';
import * as location from './middleware/searchedLocations';
import * as status from './middleware/status';

export const router = Router();

router.use(sheet.setBooks);
router.get('/', sheet.getAllRows);
router.get('/write', sheet.writeAllRows);

router.param('book', location.getBook);
router.post('/searched/:book', location.updateSearchedLocation);
router.post('/status/:book', status.updateBookStatus);
router.post('/decision', email.decision);
router.post('/look-again', email.lookAgain);
