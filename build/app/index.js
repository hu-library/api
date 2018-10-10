"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("../config");
const routes_1 = require("./routes");
exports.app = express_1.default();
// Logging
if (config_1.logFormat) {
    exports.app.use(morgan_1.default(config_1.logFormat));
}
// POST data
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
exports.app.use('/', routes_1.router);
//# sourceMappingURL=index.js.map