import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntity, Conflict } from '@curveball/http-errors';
import { findUser } from '../services/user.service';

export const checkUsernameEmailExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;
    try {
        const usernameTakenRes = findUser({ username: username }, { select: ['username'] });
        const emailTakenRes = findUser({ email: email }, { select: ['email'] });
        const [usernameTaken, emailTaken] = await Promise.all([usernameTakenRes, emailTakenRes]);
        if (usernameTaken && emailTaken) throw new Conflict('Username and Email already taken');
        if (usernameTaken) throw new Conflict('Username already taken');
        if (emailTaken) throw new Conflict('Email already exists');
        return next();
    } catch (err) {
        next(err);
    };
};

export const checkRoles = (req: Request, res: Response, next: NextFunction) => {
    const { roles } = req.body;
    try {
        if (roles) {
            roles.forEach((rol: string) => {
                if (rol !== 'ADMIN' && rol !== 'MOD' && rol !== 'USER') {
                    throw new UnprocessableEntity('Invalid role');
                }
            })
        } else {
            req.body.roles = ['USER'];
        }
        return next();
    } catch (err) {
        next(err);
    };
};