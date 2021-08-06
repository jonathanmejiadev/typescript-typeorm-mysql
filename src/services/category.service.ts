import { ICategoryInput } from '../interfaces/category.interface';
import { NotFound } from '@curveball/http-errors';
import * as categoryRepo from '../repositories/category.repository';

export const createCategory = async (category: ICategoryInput) => {
    try {
        return categoryRepo.save(category);
    } catch (err) {
        throw err;
    };
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const deletedCategory = await categoryRepo.deleteById(categoryId);
        if (!deletedCategory.affected) throw new NotFound('Category not found');
        return deletedCategory;
    } catch (err) {
        throw err;
    };
};

export const getCategories = async () => {
    try {
        return await categoryRepo.findAll();
    } catch (err) {
        throw err;
    };
};

export const getCategory = async (categoryId: number) => {
    try {
        return await categoryRepo.findById(categoryId);
    } catch (err) {
        throw err;
    };
};