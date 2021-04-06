import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, AuthGuard, AuthErrorHandler } from '../../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/profile', [AuthGuard, AuthErrorHandler], authCtrl.profile);
authRouter.delete('/deleteAccount', [AuthGuard, AuthErrorHandler], authCtrl.deleteAccount);

export default authRouter;