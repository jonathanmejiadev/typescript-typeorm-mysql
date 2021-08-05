import { Router } from 'express';
import * as categoryCtrl from '../controllers/category.controller';
import { isModerator, AuthGuard, AuthErrorHandler } from '../middlewares';
const categoryRouter = Router();

categoryRouter.get('/categories', categoryCtrl.getCategories);
categoryRouter.get('/categories/:id', categoryCtrl.getCategory);
categoryRouter.post('/categories', [AuthGuard, AuthErrorHandler, isModerator], categoryCtrl.createCategory);
categoryRouter.delete('/categories/:id', [AuthGuard, AuthErrorHandler, isModerator], categoryCtrl.deleteCategory);

export default categoryRouter;