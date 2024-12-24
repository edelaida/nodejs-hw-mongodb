import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
    host: Env(SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
        user: env(SMTP.SMTP_USER),
        pass: env(SMTP.SMTP_PASSWORD),
    },
});

export const sendEmail = async (optins) => {
    return await transporter.sendMail(options);
};
