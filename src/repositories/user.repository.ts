import User from '../entity/User';
import { IUser, IUserInput } from '../interfaces/user.interface';

export const save = async (user: IUserInput) => {
    const createdUser = User.create(user);
    return await User.save(createdUser);
};

export const findById = async (userId: number) => {
    return await User.findOne({ where: { id: userId } });
};

export const findOne = async (query: object) => {
    return await User.findOne(query);
};

export const find = async (query: object = {}) => {
    return await User.find(query);
};

export const update = async (user: User) => {
    return await User.save(user);
};

export const deleteById = async (userId: number) => {
    return await User.delete(userId);
};