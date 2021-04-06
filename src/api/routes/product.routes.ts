import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { isAdmin, isModerator, productValidationMw } from '../../middlewares';

const productRouter = Router();

productRouter.get('/all', productCtrl.allProducts);
productRouter.post('/', [isModerator, productValidationMw], productCtrl.createProduct);
productRouter.get('/', isModerator, productCtrl.getProducts);
productRouter.get('/:id', isModerator, productCtrl.getProduct);
productRouter.put('/:id', [isModerator, productValidationMw], productCtrl.updateProduct);
productRouter.delete('/:id', isAdmin, productCtrl.deleteProduct);

export default productRouter;