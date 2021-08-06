import { Request, Response, NextFunction } from 'express';
import * as reviewService from '../services/review.service';

export const createReviewAndAddToProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const userId = req.user;
        const { stars, title, description } = req.body;
        const product = await reviewService.AddReviewToProduct(Number(productId), { stars, title, description }, Number(userId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedReview = await reviewService.deleteReview(Number(id));
        return res.status(200).json({ success: true, message: 'Review has been deleted', data: deletedReview });
    } catch (err) {
        next(err);
    };
};