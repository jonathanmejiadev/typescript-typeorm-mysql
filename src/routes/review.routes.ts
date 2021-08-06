import { Router } from 'express';
import * as reviewCtrl from '../controllers/review.controller';
import { isModerator, AuthGuard, AuthErrorHandler } from '../middlewares';

const reviewRouter = Router();

// Review routes
reviewRouter.post('/reviews/:productId', [AuthGuard, AuthErrorHandler], reviewCtrl.createReviewAndAddToProduct);
reviewRouter.delete('/reviews/:id', [AuthGuard, AuthErrorHandler, isModerator], reviewCtrl.deleteReview);

export default reviewRouter;