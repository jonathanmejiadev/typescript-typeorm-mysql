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
        const user = await userRepo.findUser({ id: confirmedUser.id });
        if (!user) throw new NotFound('User not found');
        await userRepo.update(user, { confirmed: true });
        return;
    } catch (err) {
        throw err;
    };
};

export const login = async (username: string, password: string) => {
    try {
        const user = await userRepo.findUser({ username });
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