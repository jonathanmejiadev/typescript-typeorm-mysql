import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, AuthGuard, AuthErrorHandler } from '../../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const router = Router();

router.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/profile', [AuthGuard, AuthErrorHandler], authCtrl.profile);
router.delete('/deleteAccount', [AuthGuard, AuthErrorHandler], authCtrl.deleteAccount);

export default router;