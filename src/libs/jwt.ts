import { sign } from 'jsonwebtoken';
import config from '../config'

export const provideToken = (payload: number): string => {
    const userToken: string = sign({ id: payload }, config.SECRET || 'randomsecret', { expiresIn: 60 * 30 });
    return userToken;
};
