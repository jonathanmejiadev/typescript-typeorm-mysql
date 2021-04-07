import { Router } from 'express';
import { checkRoles, checkUsernameEmailExists, userValidationMw, AuthGuard, AuthErrorHandler } from '../../middlewares';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      tags: [Auth]
 *      summary: Register user
 *      produces:
 *          - "application/json"
 *      description: Use to register a user
 *      parameters: 
 *          - in: body
 *            name: user
 *            schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          '201':
 *              description: OK
 *          '409':
 *              description: Conflict, user or email already taken.
 *          '422': 
 *              description: Unprocessable Entity, didn't pass the register validation.
 *          '500':
 *              description: Server internal error.
 */
authRouter.post('/register', [userValidationMw, checkUsernameEmailExists, checkRoles], authCtrl.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      tags: [Auth]
 *      summary: Login user
 *      produces:
 *          - "application/json"
 *      description: Use to login a user
 *      parameters: 
 *          - name: username
 *            in: formData
 *            required: true
 *            type: string
 *          - name: password
 *            in: formData
 *            required: true
 *            type: string
 *      responses:
 *          '200':
 *              description: OK.
 *          '401':
 *              description: Unauthorized, user or password incorrect.
 *          '500':
 *              description: Server internal error.
 */
authRouter.post('/login', authCtrl.login);

/**
 * @swagger
 * /auth/profile:
 *  get:
 *      tags: [Auth]
 *      summary: User profile
 *      produces:
 *          - "application/json"
 *      description: Use to get current user profile (needs to be authenticated)
 *      parameters:
 *           - in: header
 *             name: Authorization
 *             type: string
 *             description: Bearer + Access Token 
 *             required: true
 *      responses:
 *          '200':
 *              description: OK.
 *          '401':
 *              description: Unauthorized.
 *          '500':
 *              description: Server internal error.
 */
authRouter.get('/profile', [AuthGuard, AuthErrorHandler], authCtrl.profile);

/**
 * @swagger
 * /auth/deleteAccount:
 *  delete:
 *      tags: [Auth]
 *      summary: Delete user account
 *      produces:
 *          - "application/json"
 *      description: Use to delete current user account (needs to be authenticated)
 *      parameters:
 *           - in: header
 *             name: Authorization
 *             type: string
 *             description: Bearer + Access Token  
 *             required: true      
 *      responses:
 *          '200':
 *              description: OK.
 *          '500':
 *              description: Server internal error.
 */
authRouter.delete('/deleteAccount', [AuthGuard, AuthErrorHandler], authCtrl.deleteAccount);

/**
 * @swagger
 * definitions:
 *  User:
 *   properties:
 *     username:
 *       type: string
 *     email:
 *       type: string
 *     password:
 *       type: string
 *     roles:
 *       type: array  
 *       description: USER, MOD and/or ADMIN
 *       items:
 *          type: string
 *   example:
 *      username: fakeuser
 *      email: fake@email.com
 *      password: fakepassword
 *      roles: ["ADMIN"]
 *   # Both properties are required
 *   required:  
 *     - username
 *     - email
 *     - password
 *     - roles 
 */

export default authRouter;