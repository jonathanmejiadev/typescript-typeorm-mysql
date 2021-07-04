import User from '../entity/User';
import { IUser } from '../interfaces/user.interface';

export const save = async (user: IUser) => {
    const createdUser = User.create(user);
    await User.save(createdUser);
    return createdUser;
};

export const findUser = async (user: object, opts = {}) => {
    return await User.findOne(user, opts);
};

export const update = async (user: User, updateData: object) => {
    let userMerge = user;
    User.merge(userMerge, updateData);
    return await User.save(userMerge);
};

export const remove = async (userId: number) => {
    return await User.delete(userId);
};