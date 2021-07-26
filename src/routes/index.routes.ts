import { Router } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import productRouter from './product.routes';
import { AuthGuard, AuthErrorHandler } from '../middlewares';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', [AuthGuard, AuthErrorHandler], userRouter);
indexRouter.use('/products', [AuthGuard, AuthErrorHandler], productRouter);

export default indexRouter;
