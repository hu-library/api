import { Router } from 'express';

import * as sheet from './middleware';

export const router = Router();

router.get('/', sheet.getAllRows);
