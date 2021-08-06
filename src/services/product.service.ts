import * as productRepo from '../repositories/product.repository';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import { IReviewInput } from '../interfaces/review.interface';
import { NotFound } from '@curveball/http-errors';
import Category from '../entity/Category';
import Product from '../entity/Product';
import Review from '../entity/Review';
import User from '../entity/User';
import * as categoryRepo from '../repositories/category.repository';
import * as reviewRepo from '../repositories/review.repository';



export const save = async (product: IProductInput) => {
    try {
        return productRepo.save(product);
    } catch (err) {
        throw err;
    }
};

export const getAllProducts = async (search: string) => {
    return await productRepo.findAllWithSearch(search);
};

export const get = async (productId: number) => {
    try {
        const product = await productRepo.findById(productId);
        if (!product) throw new NotFound('Product not found');
        return product;
    } catch (err) {
        throw err;
    };
};

export const update = async (productId: number, updateData: IProduct) => {
    try {
        const { name, stock } = updateData;
        const product = await productRepo.findById(productId);
        if (!product) throw new NotFound('Product not found');
        if (name) product.name = name;
        if (stock) product.stock = stock;
        return await productRepo.update(product);
    } catch (err) {
        throw err;
    }
};

export const remove = async (productId: number) => {
    try {
        const product = await productRepo.deleteById(productId);
        if (!product.affected) throw new NotFound('Product not found');
        return;
    } catch (err) {
        throw err;
    }
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

export const AddReviewToProduct = async (productId: number, review: IReviewInput, userId: number) => {
    try {
        const [product, user] = await Promise.all([
            await productRepo.findById(productId),
            await User.findOne({ where: { id: userId } })
        ]);
        if (!product) throw new NotFound('Product not found');
        if (!user) throw new NotFound('User not found');
        review.username = user.username;
        const savedReview = await reviewRepo.save(review);
        product.reviews.push(savedReview);
        return await productRepo.update(product);
    } catch (err) {
        throw err;
    };
};

export const deleteReview = async (reviewId: number) => {
    try {
        const deletedReview = await reviewRepo.deleteById(reviewId);
        if (!deletedReview.affected) throw new NotFound('Category not found');
        return deletedReview;
    } catch (err) {
        throw err;
    };
};