import { Request, Response, NextFunction } from 'express';
import { NotFound, Unauthorized } from '@curveball/http-errors';
import * as userService from '../services/user.service';

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await userService.findById(userId);
        if (!user) throw new NotFound('User not found');
        const isMod = user.roles.find(rol => rol === 'MOD' || rol === 'ADMIN');
        if (!isMod) throw new Unauthorized('Moderator or Admin role is required');
        return next();
    } catch (err) {
        next(err);
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await userService.findById(userId);
        if (!user) throw new NotFound('User not found');
        if (!isAdmin) throw new Unauthorized('Admin role is required');
        return next();
    } catch (err) {
        next(err);
    }
};