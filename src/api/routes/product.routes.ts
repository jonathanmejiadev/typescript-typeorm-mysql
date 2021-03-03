import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { isAdmin, isModerator, productValidationMw } from '../../middlewares';

const router = Router();

router.get('/all', productCtrl.allProducts);
router.post('/', [isModerator, productValidationMw], productCtrl.createProduct);
router.get('/', isModerator, productCtrl.getProducts);
router.get('/:id', isModerator, productCtrl.getProduct);
router.put('/:id', [isModerator, productValidationMw], productCtrl.updateProduct);
router.delete('/:id', isAdmin, productCtrl.deleteProduct);

export default router;