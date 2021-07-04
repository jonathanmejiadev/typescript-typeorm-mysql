import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await userService.profile(userId)
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    };
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        await userService.deleteAccount(userId)
        return res.status(200).json({
            success: true,
            message: 'Account has been deleted'
        });
    } catch (err) {
        next(err);
    };
};