"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const email = __importStar(require("nodemailer"));
const email_1 = require("../../config/email");
const config_1 = require("../../config");
const transporter = email.createTransport({
    service: 'gmail',
    auth: {
        user: email_1.user,
        pass: email_1.pass,
    }
});
// export function sendMail(req: Request, res: Response, next: NextFunction) {
//     if (req.body.text && req.body.text.trim()) {
//         options.text = req.body.text.trim();
//     }
//     transporter.sendMail(options, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.status(200).json({
//                 message: 'Email sent: ' + info.response,
//                 info
//             });
//         }
//     });
// }
function decision(req, res) {
    if (req.body.title && req.body.callNumber && req.body.author && req.body.patron) {
        const patron = req.body.patron;
        console.log(patron);
        console.log(patron.hNumber);
        const options = {
            from: email_1.user,
            to: email_1.to,
            subject: config_1.subjectStart + 'Awaiting librarian decision',
            text: `We are awaiting a decision from a librarian for the following book:
Title: ${req.body.title}
Call Number: ${req.body.callNumber}
Author: ${req.body.author}
Patron Name: ${patron.name}`
        };
        if (patron.hNumber.toUpperCase() !== 'UNKNOWN' && patron.hNumber !== 'undefined' && patron.hNumber !== 'N/A') {
            options.text += `
Patron H Number: ${patron.hNumber}`;
        }
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200).json({
                    message: 'Email sent: ' + info.response,
                    info
                });
            }
        });
    }
    else {
        res.status(404).json({
            error: 'Missing parameters',
            body: `Parameters sent: ${req.body}`,
            code: 404
        });
    }
}
exports.decision = decision;
function lookAgain(req, res) {
    if (req.body.title && req.body.callNumber && req.body.author && req.body.patron) {
        const patron = req.body.patron;
        console.log(patron);
        const options = {
            from: email_1.user,
            to: email_1.to,
            subject: config_1.subjectStart + 'Book is missing',
            text: `We have looked for the following book but it cannot be found:
Title: ${req.body.title}
Call Number: ${req.body.callNumber}
Author: ${req.body.author}
Patron Name: ${patron.name}`
        };
        if (patron.hNumber.toUpperCase() !== 'UNKNOWN' && patron.hNumber !== 'undefined' && patron.hNumber !== 'N/A') {
            options.text += `
Patron H Number: ${patron.hNumber}`;
        }
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                res.status(200).json({
                    message: 'Email sent: ' + info.response,
                    info
                });
            }
        });
    }
    else {
        res.status(404).json({
            error: 'Missing parameters',
            body: `Parameters sent: ${req.body}`,
            code: 404
        });
    }
}
exports.lookAgain = lookAgain;
//# sourceMappingURL=email.js.map