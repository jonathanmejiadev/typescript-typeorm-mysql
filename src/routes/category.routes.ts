import { Router } from 'express';
import * as categoryCtrl from '../controllers/category.controller';
import { isModerator, AuthGuard, AuthErrorHandler, categoryValidationMw } from '../middlewares';
const categoryRouter = Router();

// Category routes
categoryRouter.get('/', categoryCtrl.getCategories);
categoryRouter.get('/:id', categoryCtrl.getCategory);
categoryRouter.post('/', [AuthGuard, AuthErrorHandler, isModerator, categoryValidationMw], categoryCtrl.createCategory);
categoryRouter.delete('/:id', [AuthGuard, AuthErrorHandler, isModerator], categoryCtrl.deleteCategory);

export default categoryRouter;