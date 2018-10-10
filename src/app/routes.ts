import { Router } from 'express';

import * as something from './middleware/something';

export const router = Router();

router.get('/something', something.doSomething);
