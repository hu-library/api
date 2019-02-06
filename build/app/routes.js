"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sheet = __importStar(require("./middleware"));
const email = __importStar(require("./middleware/email"));
const location = __importStar(require("./middleware/searchedLocations"));
const status = __importStar(require("./middleware/status"));
exports.router = express_1.Router();
exports.router.use(sheet.setBooks);
exports.router.get('/', sheet.getAllRows);
exports.router.param('book', location.getBook);
exports.router.post('/searched/:book', location.updateSearchedLocation);
exports.router.post('/status/:book', status.updateBookStatus);
exports.router.post('/decision', email.decision);
exports.router.post('/look-again', email.lookAgain);
exports.router.post('/location/:book', location.setFoundLocation);
//# sourceMappingURL=routes.js.map