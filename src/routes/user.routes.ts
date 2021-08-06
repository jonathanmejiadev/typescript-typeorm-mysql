import { Router } from 'express';
import * as userCtrl from '../controllers/user.controller';

const userRouter = Router();

//Account routes
userRouter.get('/', userCtrl.profile);
userRouter.delete('/', userCtrl.deleteAccount);
userRouter.put('/deposit', userCtrl.deposit);

//Cart routes
userRouter.post('/cart', userCtrl.createCart);
userRouter.get('/cart', userCtrl.getCart);
userRouter.delete('/cart', userCtrl.getEmptyCart);
userRouter.post('/cart/:productId', userCtrl.addProductToCart);
userRouter.delete('/cart/:orderLineId', userCtrl.deleteProductFromCart);
userRouter.put('/cart/:orderLineId', userCtrl.updateProductFromCart);

//Order routes
userRouter.get('/orders', userCtrl.getUserOrders);
userRouter.get('/orders/:id', userCtrl.getUserOrder);

export default userRouter;