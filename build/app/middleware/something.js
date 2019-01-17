"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doSomething(req, res, next) {
    res.status(200).json({
        status: 200,
        body: 'Here is a valid response'
    });
}
exports.doSomething = doSomething;
//# sourceMappingURL=something.js.map