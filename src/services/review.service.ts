import * as productRepo from '../repositories/product.repository';
import { IReviewInput } from '../interfaces/review.interface';
import { NotFound } from '@curveball/http-errors';
import * as reviewRepo from '../repositories/review.repository';
import * as userRepo from '../repositories/user.repository';

export const createReview = async (productId: number, review: IReviewInput, userId: number) => {
    try {
        const [product, user] = await Promise.all([
            await productRepo.findById(productId),
            await userRepo.findById(userId)
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

export const updateReview = async (reviewId: number, updateData: IReviewInput) => {
    try {
        const review = await reviewRepo.findById(reviewId);
        if (!review) throw new NotFound('Category not found');
        const { stars, title, description } = updateData;
        if (stars) review.stars = stars;
        if (title) review.title = title;
        if (description) review.description = description;
        return await reviewRepo.update(review);
    } catch (err) {
        throw err;
    };
};