import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/category.service';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, description } = req.body;
        const savedCategory = await categoryService.createCategory({ name, description });
        return res.status(201).json({ success: 'true', message: 'Product has been saved', data: savedCategory });
    } catch (err) {
        next(err);
    };
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryService.deleteCategory(Number(categoryId));
        return res.status(201).json({ success: 'true', message: 'Category has been deleted', data: deletedCategory });
    } catch (err) {
        next(err);
    };
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let { search } = req.query;
        if (!search) search = '';
        const categories = await categoryService.getCategories();
        console.log('categories here')
        return res.status(200).json({ success: true, data: categories });
    } catch (err) {
        next(err);
    };
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategory(Number(categoryId));
        return res.status(200).json({ success: true, data: category });
    } catch (err) {
        next(err);
    };
};