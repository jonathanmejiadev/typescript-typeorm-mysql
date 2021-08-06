import Category from '../entity/Category';
import { ICategoryInput } from '../interfaces/category.interface';

export const save = async (category: ICategoryInput) => {
    const createdCategory = Category.create(category);
    return await Category.save(createdCategory);
};

export const findById = async (categoryId: number) => {
    return await Category.findOne({ where: { id: categoryId }, relations: ['products'] });
};

export const findAll = async () => {
    return await Category.find();
};

export const deleteById = async (categoryId: number) => {
    return await Category.delete(categoryId);
};