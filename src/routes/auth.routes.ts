import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, isAdmin, AuthGuard, AuthErrorHandler } from '../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

// Auth routes
authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/confirmation/:confirmCode', authCtrl.confirmEmail);
authRouter.put('/reset-password', [AuthGuard, AuthErrorHandler], authCtrl.resetPassword)
authRouter.put('/promote/:userId', [AuthGuard, AuthErrorHandler, isAdmin], authCtrl.promoteUser);

export default authRouter;