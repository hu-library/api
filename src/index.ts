import { app } from './app';
import { serverPort } from './config';

console.log(`Listening on port ${serverPort}...`);
app.listen(serverPort);
