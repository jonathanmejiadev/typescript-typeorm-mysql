import { Router } from 'express';
import * as reviewCtrl from '../controllers/review.controller';
import { isModerator, AuthGuard, AuthErrorHandler, reviewValidationMw } from '../middlewares';

const reviewRouter = Router();

// Review routes
reviewRouter.post('/:productId', reviewValidationMw, reviewCtrl.createReview);
reviewRouter.put('/:id', reviewCtrl.updateReview);
reviewRouter.delete('/:id', isModerator, reviewCtrl.deleteReview);

export default reviewRouter;