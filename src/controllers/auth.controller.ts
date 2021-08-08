import { Request, Response, NextFunction } from 'express';
import { IUserInput } from '../interfaces/user.interface';
import { hashPassword } from '../libs/bcrypt';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let newUser: IUserInput = { ...req.body };
        const savedUser = await authService.register(newUser);
        return res.status(201).json({
            success: true,
            message: 'Registration completed successfully',
            data: savedUser
        });
    } catch (err) {
        next(err);
    };
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { confirmCode } = req.params;
        await authService.confirmEmail(confirmCode);
        return res.status(200).json({
            success: true,
            message: 'Email has been confirmed'
        });
    } catch (err) {
        next(err);
    };
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const access_token = await authService.login(username, password);
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            access_token,
            token_type: 'Bearer'
        });
    } catch (err) {
        next(err);
    };
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user;
        const { password, newPassword } = req.body;
        await authService.changePassword(Number(userId), password, newPassword);
        return res.status(200).json({
            success: true,
            message: 'Password has been updated'
        });
    } catch (err) {
        next(err);
    };
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const resetToken = await authService.resetPassword(email);
        return res.status(200).json({
            success: true,
            message: 'An email was sent to reset the password',
            resetToken
        });
    } catch (err) {
        next(err);
    };
};

export const confirmResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { passwordResetToken } = req.params;
        await authService.confirmResetPassword(passwordResetToken);
        return res.status(200).json({
            success: true,
            message: 'An email was sent with the new password'
        });
    } catch (err) {
        next(err);
    };
};

export const promoteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        const user = await authService.promoteUser(Number(userId), role);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    };
};
