import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';
import categoryRouter from './category.routes';
import reviewRouter from './review.routes';
import { AuthGuard, AuthErrorHandler, isModerator } from '../middlewares';

const indexRouter = Router();

// Routes
indexRouter.use('/', authRouter);
indexRouter.use('/users', [AuthGuard, AuthErrorHandler], userRouter);
indexRouter.use('/products', productRouter);
indexRouter.use('/orders', [AuthGuard, AuthErrorHandler, isModerator], orderRouter);
indexRouter.use('/categories', categoryRouter);
indexRouter.use('/reviews', [AuthGuard, AuthErrorHandler], reviewRouter)

export default indexRouter;
