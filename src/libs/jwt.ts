import { sign, verify } from 'jsonwebtoken';
import config from '../config';
import { Unauthorized } from '@curveball/http-errors';


export const provideToken = (payload: number) => {
    const userToken: string = sign({ id: payload }, config.SECRET || 'randomsecret', { expiresIn: 60 * 60 * 24 });
    return userToken;
};

export const verifyToken = (token: string) => {
    try {
        const decodedToken = verify(token, config.SECRET || 'randomsecret');
        return <any>decodedToken;
    } catch (err) {
        if (err) throw new Unauthorized('Invalid token');
    }
};