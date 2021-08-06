import Product from '../entity/Product';
import { IProduct, IProductInput } from '../interfaces/product.interface';

export const save = async (product: IProductInput) => {
    const createdProduct = Product.create(product);
    return await Product.save(createdProduct);
};

export const findById = async (productId: number) => {
    return await Product.findOne({
        where: { id: productId },
        relations: ['categories', 'reviews']
    });
};

export const update = async (product: Product) => {
    return await Product.save(product);
};

export const deleteById = async (productId: number) => {
    return await Product.delete(productId);
};

export const findAllWithSearch = async (search: string) => {
    return await Product.find({ where: `name like '%${search}%'` });
};
