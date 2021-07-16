import Product from '../entity/Product';

export interface IUser {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    confirmed?: boolean;
    roles?: string[];
    wallet?: number;
    products?: Product[];
};

export interface IUserInput {
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    roles: string[];
    products: Product[];
};