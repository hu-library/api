import * as email from 'nodemailer';
import { user, pass, to } from '../../config/email';
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

const options: Options = {
    from: user,
    to,
    subject: 'HU BOT',
    text: 'Does this really work '
};

export function sendMail(req: Request, res: Response, next: NextFunction) {
    if (req.body.text && req.body.text.trim()) {
        options.text = req.body.text.trim();
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
}

export function decision(req: Request, res: Response) {
    const options: Options = {
        from: user,
        to,
        subject: 'Library book searching bot: Awaiting librarian decision',
        text: `We are awaiting `
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
}
