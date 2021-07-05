import Product from '../entity/Product';
import { IProduct, IProductInput } from '../interfaces/product.interface';

export const create = async (product: IProductInput) => {
    const createdProduct = Product.create(product);
    return await Product.save(createdProduct);
};

export const getMyProducts = async (userId: number) => {
    return await Product.find({ ownerId: userId });
};

export const getById = async (productId: number) => {
    return await Product.findOne(productId);
};

export const update = async (product: Product, updateData: IProduct) => {
    let productMerge = product;
    Product.merge(productMerge, updateData);
    return await Product.save(productMerge);
};

export const remove = async (productId: number) => {
    return await Product.delete(productId);
};

export const getAllProducts = async () => {
    return await Product.find();
};
