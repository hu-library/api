import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

import { logFormat } from '../config';

import { router } from './routes';

import { allowCORS } from '../config/cors';
export const app = express();

// Logging
if (logFormat) {
    app.use(morgan(logFormat));
}

// POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(allowCORS);

app.use('/', router);
