import * as productRepo from '../repositories/product.repository';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import { NotFound } from '@curveball/http-errors';
import Category from '../entity/Category';
import Product from '../entity/Product';


export const save = async (product: IProductInput) => {
    //return await productRepo.create(product);
    const createdProduct = Product.create(product);
    createdProduct.reviews = [];
    createdProduct.categories = [];
    return await Product.save(createdProduct)
};

export const getAllProducts = async (search: string) => {
    return await productRepo.getAll(search);
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

export const createCategory = async (name: string, description: string) => {
    try {
        const createdCategory = Category.create({ name, description })
        return await Category.save(createdCategory)
    } catch (err) {
        throw err;
    };
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const deletedCategory = await Category.delete(categoryId);
        if (!deletedCategory.affected) throw new NotFound('Category not found');
        return deletedCategory;
    } catch (err) {
        throw err;
    };
};

export const getCategories = async () => {
    try {
        return await Category.find();
    } catch (err) {
        throw err;
    };
};

export const getCategory = async (categoryId: number) => {
    try {
        return await Category.find({ where: { id: categoryId } });
    } catch (err) {
        throw err;
    };
};

export const addToCategory = async (productId: number, categoryId: number) => {
    try {
        const [product, category] = await Promise.all([await Product.findOne({ where: { id: productId }, relations: ['categories'] }), await Category.findOne({ where: { id: categoryId } })]);
        if (!product) throw new NotFound('Product not found');
        if (!category) throw new NotFound('Category not found');
        product.categories.push(category);
        return await Product.save(product);
    } catch (err) {
        throw err;
    };
};

export const deleteCategoryFromProduct = async (productId: number, categoryId: number) => {
    try {
        let product = await Product.findOne({ where: { id: productId }, relations: ['categories'] });
        if (!product) throw new NotFound('Product not found');
        product.categories = product.categories.filter(category => category.id !== categoryId);
        return await Product.save(product);
    } catch (err) {
        throw err;
    };
}