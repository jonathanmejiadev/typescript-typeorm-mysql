import * as productRepo from '../repositories/product.repository';
import { IProduct } from '../interfaces/product.interface';
import { NotFound } from '@curveball/http-errors';


export const save = async (product: IProduct) => {
    return await productRepo.create(product);
};

export const getMyProducts = async (userId: number) => {
    return await productRepo.getMyProducts(userId);
};

export const get = async (productId: number) => {
    try {
        const product = await productRepo.getById(productId);
        if (!product) throw new NotFound('Product not found');
        return product;
    } catch (err) {
        throw err;
    };
};

export const update = async (productId: number, updateData: IProduct) => {
    try {
        const { name, stock } = updateData;
        const product = await productRepo.getById(productId);
        if (!product) throw new NotFound('Product not found');
        return await productRepo.update(product, { name, stock });
    } catch (err) {
        throw err;
    }
};

export const remove = async (productId: number) => {
    try {
        const product = await productRepo.remove(productId);
        if (!product.affected) throw new NotFound('Product not found');
        return;
    } catch (err) {
        throw err;
    }
};

export const getAllProducts = async () => {
    return await productRepo.getAllProducts();
};
