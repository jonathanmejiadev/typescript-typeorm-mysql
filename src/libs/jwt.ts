import { sign, verify } from 'jsonwebtoken';
import config from '../config'

export const provideToken = (payload: number): string => {
    const userToken: string = sign({ id: payload }, config.SECRET || 'randomsecret', { expiresIn: 60 * 30 });
    return userToken;
};

export const verifyToken = (token: string): any => {
    try {
        return verify(token, config.SECRET || 'randomsecret');

    } catch (err) {
        return false;
    };
};