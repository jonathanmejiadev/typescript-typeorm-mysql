import { Request, Response, NextFunction } from 'express';
import { HttpException } from './http-exception'
import passport from 'passport';
import { Unauthorized } from '@curveball/http-errors';

export const AuthGuard = passport.authenticate('jwt', { session: false, failWithError: true });

export const AuthErrorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Unauthorized('Invalid or expired access token');
    } catch (err) {
        next(err);
    }
};