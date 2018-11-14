import * as email from 'nodemailer';
import { username as user, password as pass } from '../../config/email';
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
    to: 'bgoff1@harding.edu',
    subject: 'HU BOT',
    text: 'Does this really work ? ? ? ? ? ?'
};

export function sendMail(req: Request, res: Response, next: NextFunction) {
    if (req.body.text && req.body.text.trim()) {
        options.text = req.body.text.trim();
    }
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'Email sent: ' + info.response,
                info
            });
        }
    });
}
