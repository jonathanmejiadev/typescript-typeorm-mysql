import { Request, Response, NextFunction } from 'express'
import User from '../api/entity/User';
import { Unauthorized } from '@curveball/http-errors';

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await User.findOne(userId);
        const isMod = user?.roles.find(rol => rol === 'MOD' || rol === 'ADMIN');
        if (!isMod) throw new Unauthorized('Moderator or Admin role is required');
        return next();
    } catch (err) {
        next(err);
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await User.findOne(userId);
        const isAdmin = user?.roles.find(rol => rol === 'ADMIN');
        if (!isAdmin) throw new Unauthorized('Admin role is required');
        return next();
    } catch (err) {
        next(err);
    }
};