import { Router } from 'express';

import * as sheet from './middleware';

export const router = Router();

sheet.setBooks();

router.get('/', sheet.getAllRows);
router.post('/w', sheet.writeAllRows);
