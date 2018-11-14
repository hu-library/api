import { Router } from 'express';

import * as sheet from './middleware';
import * as email from './middleware/email';

export const router = Router();

sheet.setBooks();

router.get('/', sheet.getAllRows);
router.get('/write', sheet.writeAllRows);
router.post('/email', email.sendMail);
