import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../entity/User';
import Product, { IProduct } from '../entity/Product';
import { NotFound } from '@curveball/http-errors';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct: IProduct = { ...req.body };
        newProduct.ownerId = req.user;
        const createdProduct = Product.create(newProduct);
        const savedProduct = await Product.save(createdProduct);
        return res.status(201).json({ success: 'true', message: 'Product has been saved', data: savedProduct });
    }
    catch (err) {
        next(err);
    }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const products = await Product.find({ ownerId: userId });
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
        const product = await User.findOne(productId);
        if (!product) throw new NotFound('Product not found');
        return res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    const { name, stock } = req.body;
    try {
        const product = await Product.findOne(productId);
        if (!product) throw new NotFound('Product not found');
        Product.merge(product, { name, stock });
        const updatedProduct = await Product.save(product);
        return res.status(200).json({ success: true, message: 'Product has been updated', data: updatedProduct });
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    try {
        const product = await Product.delete(productId);
        if (!product.affected) throw new NotFound('Product not found');
        return res.status(200).json({ success: true, message: 'Product has been deleted' });
    } catch (err) {
        next(err);
    }
};

export const allProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
};