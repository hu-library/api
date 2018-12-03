import { Router } from 'express';

import * as sheet from './middleware';
import * as email from './middleware/email';
import * as location from './middleware/searchedLocations';
import * as status from './middleware/status';

export const router = Router();

router.use(sheet.setBooks);
router.get('/', sheet.getAllRows);
router.get('/write', sheet.writeAllRows);
router.post('/email', email.sendMail);

router.param('book', location.getBook);
router.post('/searched/:book', location.updateSearchedLocation);
router.post('/status/:book', status.updateBookStatus);
