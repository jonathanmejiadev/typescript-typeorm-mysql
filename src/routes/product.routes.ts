import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { isAdmin, isModerator, productValidationMw, AuthGuard, AuthErrorHandler } from '../middlewares';

const productRouter = Router();

// Product categories routes
productRouter.post('/:productId/:categoryId', [AuthGuard, AuthErrorHandler, isModerator], productCtrl.addToCategory);
productRouter.delete('/:productId/:categoryId', [AuthGuard, AuthErrorHandler, isModerator], productCtrl.deleteCategoryFromProduct);

// Review routes
productRouter.post('/reviews/:productId', [AuthGuard, AuthErrorHandler], productCtrl.createReviewAndAddToProduct);
productRouter.delete('/reviews/:id', [AuthGuard, AuthErrorHandler, isModerator], productCtrl.deleteReview);

// Product routes
productRouter.get('/', productCtrl.allProducts);
productRouter.post('/', [AuthGuard, AuthErrorHandler, isModerator, productValidationMw], productCtrl.createProduct);
productRouter.get('/:id', productCtrl.getProduct);
productRouter.put('/:id', [AuthGuard, AuthErrorHandler, isModerator, productValidationMw], productCtrl.updateProduct);
productRouter.delete('/:id', [AuthGuard, AuthErrorHandler, isAdmin], productCtrl.deleteProduct);

export default productRouter;