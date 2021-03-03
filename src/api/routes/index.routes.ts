import { Router } from 'express';
import authRouter from './auth.routes';
import productsRouter from './product.routes';
import { AuthGuard, AuthErrorHandler } from '../../middlewares';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', [AuthGuard, AuthErrorHandler], productsRouter);

export default router;
