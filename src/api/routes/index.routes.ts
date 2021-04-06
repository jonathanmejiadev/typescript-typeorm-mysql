import { Router } from 'express';
import authRouter from './auth.routes';
import productsRouter from './product.routes';
import { AuthGuard, AuthErrorHandler } from '../../middlewares';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/products', [AuthGuard, AuthErrorHandler], productsRouter);

export default indexRouter;
