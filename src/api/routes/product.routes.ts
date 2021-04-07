import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { isAdmin, isModerator, productValidationMw } from '../../middlewares';

const productRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products CRUD
 */

/**
 * @swagger
 * /products/all:
 *  get:
 *      tags: [Products]
 *      summary: Get all users products
 *      produces:
 *          - "application/json"
 *      description: Use to get all users products (needs to be authenticated)
 *      parameters:
 *           - in: header
 *             name: Authorization
 *             type: string
 *             required: true
 *      responses:
 *          '200':
 *              description: OK.
 *          '401':
 *              description: Unauthorized.
 *          '500':
 *              description: Server internal error.
 */
productRouter.get('/all', productCtrl.allProducts);

/**
 * @swagger
 * /products:
 *  get:
 *      tags: [Products]
 *      summary: Get all current user products
 *      produces:
 *          - "application/json"
 *      description: Use to get all current user products (needs to be authenticated)
 *      parameters:
 *           - in: header
 *             name: Authorization
 *             type: string
 *             required: true
 *      responses:
 *          '200':
 *              description: OK.
 *          '401':
 *              description: Unauthorized.
 *          '500':
 *              description: Server internal error.
 */
productRouter.get('/', isModerator, productCtrl.getProducts);

/**
 * @swagger
 * /products:
 *  post:
 *      tags: [Products]
 *      summary: Create product
 *      produces:
 *          - "application/json"
 *      description: Use to create a product (needs to be authenticated)
 *      parameters: 
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: stock
 *            in: formData
 *            required: true
 *            type: number
 *          - in: header
 *            name: Authorization
 *            type: string
 *            required: true
 *      responses:
 *          '201':
 *              description: Created.
 *          '422':
 *              description: Unprocessable Entity, didn't pass the product validation.
 *          '500':
 *              description: Server internal error.
 */
productRouter.post('/', [isModerator, productValidationMw], productCtrl.createProduct);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      tags: [Products]
 *      summary: Get product by id
 *      produces:
 *          - "application/json"
 *      description: Use to get a product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: OK.
 *          '404':
 *              description: Not found.
 *          '500':
 *              description: Server internal error.
 */
productRouter.get('/:id', isModerator, productCtrl.getProduct);

/**
 * @swagger
 * /products/{id}:
 *  put:
 *      tags: [Products]
 *      summary: Update product by id
 *      produces:
 *          - "application/json"
 *      description: Use to update a product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            required: true
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: stock
 *            in: formData
 *            required: true
 *            type: number
 *      responses:
 *          '200':
 *              description: OK.
 *          '404':
 *              description: Not found.
 *          '500':
 *              description: Server internal error.
 */
productRouter.put('/:id', [isModerator, productValidationMw], productCtrl.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      tags: [Products]
 *      summary: Delete product by id
 *      produces:
 *          - "application/json"
 *      description: Use to delete a product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: id
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            required: true
 *      responses:
 *          '200':
 *              description: OK.
 *          '404':
 *              description: Not found.
 *          '500':
 *              description: Server internal error.
 */
productRouter.delete('/:id', isAdmin, productCtrl.deleteProduct);

export default productRouter;