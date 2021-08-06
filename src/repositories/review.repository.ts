import Review from '../entity/Review';
import { IReviewInput } from '../interfaces/review.interface';

export const save = async (review: IReviewInput) => {
    const createdReview = Review.create(review);
    return await Review.save(createdReview);
};

export const findById = async (reviewId: number) => {
    return await Review.findOne({ where: { id: reviewId } });
};

export const find = async (query: object) => {
    return await Review.find(query);
};

export const findAll = async () => {
    return await Review.find();
};

export const deleteById = async (reviewId: number) => {
    return await Review.delete(reviewId);
};

export const update = async (review: Review) => {
    return await Review.save(review);
};