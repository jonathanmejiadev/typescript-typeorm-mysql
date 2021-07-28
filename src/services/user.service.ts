import * as userRepo from '../repositories/user.repository';
import { NotFound } from '@curveball/http-errors';
import { IUser } from '../interfaces/user.interface';
import Order from '../entity/Order';
import User from '../entity/User'

export const profile = async (userId: number) => {
    const user = await userRepo.findUser({ id: userId }, { select: ['id', 'username', 'email', 'wallet', 'roles'], relations: ['products'] });
    if (!user) throw new NotFound('User not found');
    return user;
};

export const deleteAccount = async (userId: number) => {
    return await userRepo.remove(userId);
};

export const findUser = async (user: IUser, opts?: object) => {
    return await userRepo.findUser(user, opts)
};

export const depositToWallet = async (userId: number, cash: number) => {
    const user = await userRepo.findUser({ id: userId });
    if (!user) throw new NotFound('User not found');
    // const deposit = user.wallet + cash;
    // return await userRepo.update(user, { wallet: deposit });
};

export const createCart = async (userId: number, cart: object) => {
    let orderData = { status: 'on_cart', total: 0 };
    let order = await Order.create(orderData)
}