import Category from '../entity/Category';
import { ICategoryInput } from '../interfaces/category.interface';
import { NotFound } from '@curveball/http-errors';

export const createCategory = async (category: ICategoryInput) => {
    try {
        const createdCategory = Category.create(category)
        return await Category.save(createdCategory)
    } catch (err) {
        throw err;
    };
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const deletedCategory = await Category.delete(categoryId);
        if (!deletedCategory.affected) throw new NotFound('Category not found');
        return deletedCategory;
    } catch (err) {
        throw err;
    };
};

export const getCategories = async () => {
    try {
        return await Category.find();
    } catch (err) {
        throw err;
    };
};

export const getCategory = async (categoryId: number) => {
    try {
        return await Category.find({ where: { id: categoryId }, relations: ['products'] });
    } catch (err) {
        throw err;
    };
};