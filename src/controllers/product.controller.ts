import { Request, Response, NextFunction } from 'express';
import { IProduct, IProductInput } from '../interfaces/product.interface';
import * as productService from '../services/product.service';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct: IProductInput = { ...req.body };
        const savedProduct = await productService.createProduct(newProduct);
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
        const products = await productService.getProducts(search.toString());
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    };
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProduct(Number(productId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const { name, stock } = req.body;
        const updatedProduct = await productService.updateProduct(Number(productId), { name, stock });
        return res.status(200).json({ success: true, message: 'Product has been updated', data: updatedProduct });
    } catch (err) {
        next(err);
    };
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        await productService.deleteProduct(Number(productId));
        return res.status(200).json({ success: true, message: 'Product has been deleted' });
    } catch (err) {
        next(err);
    };
};

export const addToCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, categoryId } = req.params;
        const product = await productService.addToCategory(Number(productId), Number(categoryId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const deleteCategoryFromProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, categoryId } = req.params;
        const product = await productService.deleteCategoryFromProduct(Number(productId), Number(categoryId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const createReviewAndAddToProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const userId = req.user;
        const { stars, title, description } = req.body;
        const product = await productService.AddReviewToProduct(Number(productId), { stars, title, description }, Number(userId));
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    };
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedReview = await productService.deleteReview(Number(id));
        return res.status(200).json({ success: true, message: 'Review has been deleted', data: deletedReview });
    } catch (err) {
        next(err);
    };
};