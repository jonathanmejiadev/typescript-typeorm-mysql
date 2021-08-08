import * as userRepo from '../repositories/user.repository';
import { IUser, IUserInput } from '../interfaces/user.interface';
import { hashPassword, validatePassword } from '../libs/bcrypt';
import { provideToken, verifyToken } from '../libs/jwt';
import { sendConfirmationEmail } from '../libs/nodemailer';
import { Unauthorized, NotFound } from '@curveball/http-errors';

export const register = async (user: IUserInput) => {
    try {
        user.password = await hashPassword(user.password);
        const savedUser = await userRepo.save(user);
        const confirmEmailToken = provideToken(savedUser.id);
        sendConfirmationEmail(savedUser.email, confirmEmailToken);
        return savedUser;
    } catch (err) {
        throw err;
    }
};

export const confirmEmail = async (confirmCode: string) => {
    try {
        const confirmedUser = verifyToken(confirmCode);
        if (!confirmedUser) throw new Unauthorized('Invalid email token');
        let user = await userRepo.findOne({ where: { id: confirmedUser.id } });
        if (!user) throw new NotFound('User not found');
        user.confirmed = true;
        await userRepo.update(user);
        return;
    } catch (err) {
        throw err;
    };
};

export const login = async (username: string, password: string) => {
    try {
        const user = await userRepo.findOne({ where: { username } });
        if (!user) throw new Unauthorized('Incorrect username');
        if (!user.confirmed) throw new Unauthorized('Please confirm your account');
        const passwordMatch = await validatePassword(password, user.password);
        if (!passwordMatch) throw new Unauthorized('Incorrect password');
        const access_token = provideToken(user.id);
        return access_token;
    } catch (err) {
        throw err;
    };
};

export const promoteUser = async (userId: number, role: string) => {
    try {
        let user = await userRepo.findById(userId);
        if (!user) throw new NotFound('User not found');
        user.role = role;
        return await userRepo.update(user);
    } catch (err) {
        throw err;
    };
};