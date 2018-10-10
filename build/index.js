"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
console.log(`Listening on port ${config_1.serverPort}...`);
app_1.app.listen(config_1.serverPort);
//# sourceMappingURL=index.js.map