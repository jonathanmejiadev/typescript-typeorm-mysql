import Review from '../entity/Review';
import Category from '../entity/Category';

export interface IProduct {
    id?: number;
    name?: string;
    stock?: number;
    description?: string;
    price?: number;
    images?: string[];
    reviews?: Review[];
    categories?: Category[];
};

export interface IProductInput {
    name: string;
    description: string;
    stock: number;
    price: number;
    images: string[];
};