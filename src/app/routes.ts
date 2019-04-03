import { Router } from 'express';

import * as sheet from './middleware';
import * as email from './middleware/email';
import * as location from './middleware/searchedLocations';
import * as status from './middleware/status';
import * as inventory from './middleware/inventory';

export const router = Router();

router.use(sheet.setBooks);
router.use(inventory.setInventory);
router.get('/', sheet.getAllRows);

router.get('/inventory', inventory.getInventory);
router.param('iBook', inventory.getInventoryBook);
router.post('/inventory/searched/:iBook', inventory.addSearchLocations);
router.param('inv', inventory.getInventoryRowAndBook);
router.post('/inventory/missing/:inv', inventory.addBookToMissing);

router.param('book', location.getBook);
router.post('/searched/:book', location.updateSearchedLocation);
router.post('/status/:book', status.updateBookStatus);
router.post('/decision', email.decision);
router.post('/look-again', email.lookAgain);
router.post('/location/:book', location.setFoundLocation);
