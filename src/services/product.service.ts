import * as productRepo from '../repositories/product.repository';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import { IReviewInput } from '../interfaces/review.interface';
import { NotFound } from '@curveball/http-errors';
import Category from '../entity/Category';
import Product from '../entity/Product';
import Review from '../entity/Review';
import User from '../entity/User';



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
        const product = await Product.find({
            where: { id: productId },
            relations: ['categories', 'reviews']
        });
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

export const addToCategory = async (productId: number, categoryId: number) => {
    try {
        const [product, category] = await Promise.all([
            await Product.findOne({
                where: { id: productId },
                relations: ['categories']
            }),
            await Category.findOne({ where: { id: categoryId } })
        ]);
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
        let product = await Product.findOne({
            where: { id: productId },
            relations: ['categories']
        });
        if (!product) throw new NotFound('Product not found');
        product.categories = product.categories.filter(category => category.id !== categoryId);
        return await Product.save(product);
    } catch (err) {
        throw err;
    };
};

export const createReview = async (review: IReviewInput) => {
    try {
        const createdReview = Review.create(review);
        return await Review.save(createdReview);
    } catch (err) {
        throw err;
    };
};

export const AddReviewToProduct = async (productId: number, review: IReviewInput, userId: number) => {
    try {
        const [product, user] = await Promise.all([
            await Product.findOne({
                where: { id: productId },
                relations: ['reviews']
            }),
            await User.findOne({ where: { id: userId } })
        ]);
        if (!product) throw new NotFound('Product not found');
        if (!user) throw new NotFound('User not found');
        review.username = user.username;
        const savedReview = await createReview(review);
        product.reviews.push(savedReview);
        return await Product.save(product);
    } catch (err) {
        throw err;
    };
};

export const deleteReview = async (reviewId: number) => {
    try {
        const deletedReview = await Review.delete(reviewId);
        if (!deletedReview.affected) throw new NotFound('Category not found');
        return deletedReview;
    } catch (err) {
        throw err;
    };
};