import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';
import { AuthGuard, AuthErrorHandler, isModerator } from '../middlewares';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', [AuthGuard, AuthErrorHandler], userRouter);
indexRouter.use('/products', productRouter);
indexRouter.use('/orders', [AuthGuard, AuthErrorHandler, isModerator], orderRouter);

export default indexRouter;
