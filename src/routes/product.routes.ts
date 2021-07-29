import { Router } from 'express';
import * as productCtrl from '../controllers/product.controller';
import { isAdmin, isModerator, productValidationMw } from '../middlewares';

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
 *      summary: All products
 *      produces:
 *          - "application/json"
 *      description: Use to get all products from all users (needs to be authenticated)
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
productRouter.get('/', productCtrl.allProducts);

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
 *          - in: header
 *            name: Authorization
 *            type: string
 *            description: Bearer + Access Token   
 *            required: true
 *          - in: body
 *            name: product
 *            schema:
 *              $ref: '#/definitions/Product'
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
 * /products/{productId}:
 *  get:
 *      tags: [Products]
 *      summary: Get product by id
 *      produces:
 *          - "application/json"
 *      description: Use to get a single product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: productId
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            description: Bearer + Access Token   
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
 * /products/{productId}:
 *  put:
 *      tags: [Products]
 *      summary: Update product by id
 *      produces:
 *          - "application/json"
 *      description: Use to update a product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: productId
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            description: Bearer + Access Token
 *            required: true
 *          - in: body
 *            name: product
 *            schema:
 *              $ref: '#/definitions/Product'
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
 * /products/{productId}:
 *  delete:
 *      tags: [Products]
 *      summary: Delete product by id
 *      produces:
 *          - "application/json"
 *      description: Use to delete a product by id (needs to be authenticated)
 *      parameters: 
 *          - in: path
 *            name: productId
 *            required: true
 *            type: string
 *          - in: header
 *            name: Authorization
 *            type: string
 *            description: Bearer + Access Token 
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


productRouter.post('/categories', productCtrl.createCategory);
productRouter.delete('/categories/:id', productCtrl.deleteCategory);


//Definitions (Models)

/**
 * @swagger
 * definitions:
 *  Product:
 *   properties:
 *     name:
 *       type: string
 *     stock:
 *       type: integer
 *       minimum: 1
 *   example:
 *     name: fake product
 *     stock: 10  
 *   # Both properties are required
 *   required:  
 *     - name
 *     - stock
 */

export default productRouter;