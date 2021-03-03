import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../entity/User';
import { provideToken } from '../../libs/jwt';
import { Unauthorized, NotFound } from '@curveball/http-errors';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let newUser: IUser = { ...req.body };
        const createdUser = User.create(newUser);
        createdUser.password = await createdUser.hashPassword(newUser.password);
        await User.save(createdUser);
        return res.status(201).json({
            success: true,
            message: 'Registration completed successfully'
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) throw new Unauthorized('Incorrect username');
        const passwordMatch = await user.validatePassword(password);
        if (!passwordMatch) throw new Unauthorized('Incorrect password');
        const access_token = provideToken(user.id);
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            access_token,
            token_type: 'Bearer'
        });
    } catch (err) {
        next(err);
    }
};

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await User.findOne({ id: userId }, { select: ['id', 'username', 'email', 'roles'], relations: ['products'] });
        if (!user) throw new NotFound('User not found');
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        await User.delete(userId);
        return res.status(200).json({
            success: true,
            message: 'Account has been deleted'
        });
    } catch (err) {
        next(err);
    }
};