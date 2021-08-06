import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

import { products, categories } from '../data'
import * as productService from '../services/product.service';
import * as categoryService from '../services/category.service';

const seedRouter = Router();

seedRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Promise.all(categories.map((category) => {
            categoryService.createCategory(category);
        }));
        await Promise.all(products.map((product) => {
            productService.createProduct(product);
        }));
        return res.status(201).json({ success: true, message: 'Seeds loaded successfully' });
    } catch (err) {
        next(err);
    };
});

export default seedRouter;