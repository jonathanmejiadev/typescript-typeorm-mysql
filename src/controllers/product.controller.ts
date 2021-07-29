import { Request, Response, NextFunction } from 'express';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct: IProductInput = { ...req.body };
        const savedProduct = await productService.save(newProduct);
        return res.status(201).json({ success: 'true', message: 'Product has been saved', data: savedProduct });
    }
    catch (err) {
        next(err);
    };
};

export const allProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { search } = req.query;
        if (!search) search = '';
        const products = await productService.getAllProducts(search.toString());
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    };
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await productService.get(Number(productId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const { name, stock } = req.body;
        const updatedProduct = await productService.update(Number(productId), { name, stock });
        return res.status(200).json({ success: true, message: 'Product has been updated', data: updatedProduct });
    } catch (err) {
        next(err);
    };
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        await productService.remove(Number(productId));
        return res.status(200).json({ success: true, message: 'Product has been deleted' });
    } catch (err) {
        next(err);
    };
};

