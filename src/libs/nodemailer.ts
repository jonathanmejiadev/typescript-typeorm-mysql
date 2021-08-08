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

export const sendConfirmationEmail = async (email: string, confirmCode: string) => {
    try {
        const url = `${config.DOMAIN}/confirmation/${confirmCode}`;
        const emailSent = await transporter.sendMail({
            from: '"E-Commerce API REST 👻" <jonathanmejia.ar@gmail.com>',
            to: email,
            subject: "Confirm email",
            html: `
            <b>Please click on the following link to confirm your email:</b>
            <a href="${url}">${url}</a>
            `,
        });
    } catch (err) {
        console.log(err);
    };
};

export const sendResetPasswordToken = async (username: string, email: string, resetPasswordToken: string) => {
    try {
        const url = `${config.DOMAIN}/reset-password/${resetPasswordToken}`;
        const emailSent = await transporter.sendMail({
            from: '"E-Commerce API REST 👻" <jonathanmejia.ar@gmail.com>',
            to: email,
            subject: "Password Reset",
            html: `
            <h1>Hello ${username}!</h1>
            <b>Please click the following link to reset your password.</b>
            <p>If you have not created this password reset request, you can ignore this email.</p>
            <a href="${url}">${url}</a>
            `,
        });
    } catch (err) {
        console.log(err);
    };
};

export const sendConfirmResetPassword = async (username: string, email: string, newPassword: String) => {
    try {
        const emailSent = await transporter.sendMail({
            from: '"E-Commerce API REST 👻" <jonathanmejia.ar@gmail.com>',
            to: email,
            subject: "Password reset successfully",
            html: `
            <h1>Hello ${username}!</h1>
            <b>You have successfully reset your password, your new password is:</b>
            <p>${newPassword}</p>
            `,
        });
    } catch (err) {
        console.log(err);
    };
};