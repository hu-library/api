import * as email from 'nodemailer';
import { user, pass, to } from '../../config/email';
import { subjectStart } from '../../config';
import { Response, NextFunction, Request } from 'express';

const transporter = email.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass,
    }
});

interface Options {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export function decision(req: Request, res: Response) {
    if (req.body.title && req.body.callNumber && req.body.author && req.body.patron) {
        const patron = req.body.patron;
        const options: Options = {
            from: user,
            to,
            subject: subjectStart + 'Awaiting librarian decision',
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
            } else {
                res.status(200).json({
                    message: 'Email sent: ' + info.response,
                    info
                });
            }
        });
    } else {
        res.status(404).json({
            error: 'Missing parameters',
            body: `Parameters sent: ${req.body}`,
            code: 404
        });
    }
}

export function lookAgain(req: Request, res: Response) {
    if (req.body.title && req.body.callNumber && req.body.author && req.body.patron) {
        const patron = req.body.patron;
        const options: Options = {
            from: user,
            to,
            subject: subjectStart + 'Book is missing',
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
            } else {
                res.status(200).json({
                    message: 'Email sent: ' + info.response,
                    info
                });
            }
        });
    } else {
        res.status(404).json({
            error: 'Missing parameters',
            body: `Parameters sent: ${req.body}`,
            code: 404
        });
    }
}
