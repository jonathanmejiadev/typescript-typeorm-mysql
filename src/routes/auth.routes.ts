import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, isAdmin, AuthGuard, AuthErrorHandler } from '../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

// Auth routes
authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/confirmation/:confirmCode', authCtrl.confirmEmail);
authRouter.put('/change-password', [AuthGuard, AuthErrorHandler], authCtrl.changePassword);
authRouter.post('/reset-password', authCtrl.resetPassword);
authRouter.get('/reset-password/:passwordResetToken', authCtrl.confirmResetPassword);
authRouter.put('/promote/:userId', [AuthGuard, AuthErrorHandler, isAdmin], authCtrl.promoteUser);

export default authRouter;