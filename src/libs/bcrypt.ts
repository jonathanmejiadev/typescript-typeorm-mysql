import { hash, compare, genSalt } from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const salt = await genSalt(10);
    return hash(password, salt);
};

export const validatePassword = async (password: string, passwordToCompare: string) => {
    return await compare(password, passwordToCompare);
};