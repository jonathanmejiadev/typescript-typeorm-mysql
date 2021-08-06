import { Router } from 'express';
import * as orderCtrl from '../controllers/order.controller';

const orderRoute = Router();

//Order routes
orderRoute.get('/', orderCtrl.getOrders);
orderRoute.get('/:id', orderCtrl.getOrder);
orderRoute.put('/:id', orderCtrl.changeOrderStatus);

export default orderRoute;