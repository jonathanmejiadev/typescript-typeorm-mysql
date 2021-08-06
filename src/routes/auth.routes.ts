import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, AuthGuard, AuthErrorHandler } from '../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

// Auth routes
authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/confirmation/:confirmCode', authCtrl.confirmEmail);

export default authRouter;