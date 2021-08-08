import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, isAdmin } from '../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

// Auth routes
authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.get('/confirmation/:confirmCode', authCtrl.confirmEmail);
authRouter.put('/promote/:userId', isAdmin,)
authRouter.put('/degrade/:userId', isAdmin,)

export default authRouter;