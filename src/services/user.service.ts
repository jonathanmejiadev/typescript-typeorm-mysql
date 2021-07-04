import * as userRepo from '../repositories/user.repository';
import { NotFound } from '@curveball/http-errors';
import { IUser } from '../interfaces/user.interface';

export const profile = async (userId: number) => {
    const user = await userRepo.findUser({ id: userId }, { select: ['id', 'username', 'email', 'roles'], relations: ['products'] });
    if (!user) throw new NotFound('User not found');
    return user;
};

export const deleteAccount = async (userId: number) => {
    return await userRepo.remove(userId);
};

export const findUser = async (user: object, opts?: object) => {
    return await userRepo.findUser(user, opts)
};