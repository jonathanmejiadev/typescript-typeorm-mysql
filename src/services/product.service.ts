import * as productRepo from '../repositories/product.repository';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import { NotFound } from '@curveball/http-errors';
import * as categoryRepo from '../repositories/category.repository';

export const createProduct = async (product: IProductInput) => {
    try {
        return productRepo.save(product);
    } catch (err) {
        throw err;
    };
};

export const getProducts = async (search: string) => {
    try {
        return await productRepo.findAllWithSearch(search);
    } catch (err) {
        throw err;
    };
};

export const getProduct = async (productId: number) => {
    try {
        const product = await productRepo.findById(productId);
        if (!product) throw new NotFound('Product not found');
        return product;
    } catch (err) {
        throw err;
    };
};

export const updateProduct = async (productId: number, updateData: IProduct) => {
    try {
        const { name, stock } = updateData;
        const product = await productRepo.findById(productId);
        if (!product) throw new NotFound('Product not found');
        if (name) product.name = name;
        if (stock) product.stock = stock;
        return await productRepo.update(product);
    } catch (err) {
        throw err;
    };
};

export const deleteProduct = async (productId: number) => {
    try {
        const product = await productRepo.deleteById(productId);
        if (!product.affected) throw new NotFound('Product not found');
        return;
    } catch (err) {
        throw err;
    };
};

export const addToCategory = async (productId: number, categoryId: number) => {
    try {
        const [product, category] = await Promise.all([
            await productRepo.findById(productId),
            await categoryRepo.findById(categoryId)
        ]);
        if (!product) throw new NotFound('Product not found');
        if (!category) throw new NotFound('Category not found');
        product.categories.push(category);
        return await productRepo.update(product);
    } catch (err) {
        throw err;
    };
};

export const deleteCategoryFromProduct = async (productId: number, categoryId: number) => {
    try {
        let product = await productRepo.findById(productId);
        if (!product) throw new NotFound('Product not found');
        product.categories = product.categories.filter(category => category.id !== categoryId);
        return await productRepo.update(product);
    } catch (err) {
        throw err;
    };
};