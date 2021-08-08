import * as userRepo from '../repositories/user.repository';
import { IUserInput } from '../interfaces/user.interface';
import { hashPassword, validatePassword } from '../libs/bcrypt';
import { provideToken, verifyToken } from '../libs/jwt';
import { sendConfirmationEmail, sendConfirmResetPassword, sendResetPasswordToken } from '../libs/nodemailer';
import { Unauthorized, NotFound, BadRequest } from '@curveball/http-errors';

export const register = async (user: IUserInput) => {
    try {
        user.password = await hashPassword(user.password);
        const savedUser = await userRepo.save(user);
        const confirmEmailToken = provideToken(savedUser.id);
        sendConfirmationEmail(savedUser.email, confirmEmailToken);
        return savedUser;
    } catch (err) {
        throw err;
    }
};

export const confirmEmail = async (confirmCode: string) => {
    try {
        const confirmedUser = verifyToken(confirmCode);
        if (!confirmedUser) throw new Unauthorized('Invalid email token');
        let user = await userRepo.findOne({ where: { id: confirmedUser.id } });
        if (!user) throw new NotFound('User not found');
        user.confirmed = true;
        await userRepo.update(user);
        return;
    } catch (err) {
        throw err;
    };
};

export const login = async (username: string, password: string) => {
    try {
        const user = await userRepo.findOne({ where: { username } });
        if (!user) throw new Unauthorized('Incorrect username or password');
        if (!user.confirmed) throw new Unauthorized('Please confirm your account');
        const passwordMatch = await validatePassword(password, user.password);
        if (!passwordMatch) throw new Unauthorized('Incorrect username or password');
        const access_token = provideToken(user.id);
        return access_token;
    } catch (err) {
        throw err;
    };
};

export const changePassword = async (userId: number, password: string, newPassword: string) => {
    try {
        const user = await userRepo.findById(userId);
        if (!user) throw new Unauthorized('Incorrect username or password');
        const passwordMatch = await validatePassword(password, user.password);
        if (!passwordMatch) throw new Unauthorized('Incorrect username or password');
        user.password = await hashPassword(newPassword);
        return await userRepo.update(user);
    } catch (err) {
        throw err;
    };
};

export const resetPassword = async (email: string) => {
    try {
        if (!email) throw new BadRequest('Email is required');
        const user = await userRepo.findOne({ where: { email } });
        if (!user) throw new NotFound('User with that email not found');
        const resetPasswordToken = provideToken(user.id);
        sendResetPasswordToken(user.username, user.email, resetPasswordToken);
        return resetPasswordToken;
    } catch (err) {
        throw err;
    };
};

export const confirmResetPassword = async (passwordResetToken: string) => {
    try {
        const verifiedToken = verifyToken(passwordResetToken);
        if (!verifiedToken) throw new Unauthorized('Invalid password reset token');
        let user = await userRepo.findOne({ where: { id: verifiedToken.id } });
        if (!user) throw new NotFound('User not found');
        let newPassword = passwordResetToken.slice(passwordResetToken.length - 20, passwordResetToken.length);
        user.password = await hashPassword(newPassword);
        await userRepo.update(user);
        sendConfirmResetPassword(user.username, user.email, newPassword);
        return;
    } catch (err) {
        throw err;
    };
};

export const promoteUser = async (userId: number, role: string) => {
    try {
        let user = await userRepo.findById(userId);
        if (!user) throw new NotFound('User not found');
        user.role = role;
        return await userRepo.update(user);
    } catch (err) {
        throw err;
    };
};