import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
    },
});

export const confirmEmail = async (email: string, confirmCode: string) => {
    try {
        const url = `${config.DOMAIN}/auth/confirmation/${confirmCode}`;
        const emailSent = await transporter.sendMail({
            from: '"Market API 👻" <jonathanmejia.ar@gmail.com>',
            to: email,
            subject: "Confirm email",
            html: `
            <b>Please click on the following link to confirm your email:</b>
            <a href="${url}">${url}</a>
            `,
        });
        console.log(emailSent.messageId);
    } catch (err) {
        console.log(err);
    }
};