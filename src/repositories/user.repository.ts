import User from '../entity/User';
import { IUser, IUserInput } from '../interfaces/user.interface';

export const save = async (user: IUserInput) => {
    const createdUser = User.create(user);
    await User.save(createdUser);
    return createdUser;
};

export const findUser = async (user: IUser, opts = {}) => {
    return await User.findOne(user, opts);
};

export const update = async (user: User, updateData: IUser) => {
    let userMerge = user;
    User.merge(userMerge, updateData);
    return await User.save(userMerge);
};

export const remove = async (userId: number) => {
    return await User.delete(userId);
};