import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let newUser: IUser = { ...req.body };
        await authService.register(newUser);
        return res.status(201).json({
            success: true,
            message: 'Registration completed successfully'
        });
    } catch (err) {
        next(err);
    };
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { confirmCode } = req.params;
        //investigar distintos casos de confirm
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
    const { username, password } = req.body;
    try {
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
