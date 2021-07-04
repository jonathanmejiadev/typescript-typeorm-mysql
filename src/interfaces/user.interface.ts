import Product from '../entity/Product';

export interface IUser {
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    roles: string[];
    products?: Product[];
};