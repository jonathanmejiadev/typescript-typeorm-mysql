import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntity } from '@curveball/http-errors'
import { userValidation, productValidation, categoryValidation } from '../validations';

export const userValidationMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userValidation.validateAsync({ ...req.body });
        return next();
    } catch (err) {
        next(new UnprocessableEntity(err.message));
    }
};

export const productValidationMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productValidation.validateAsync({ ...req.body });
        const { name } = req.body
        req.body.name = name.trim();
        return next();
    } catch (err) {
        next(new UnprocessableEntity(err.message));
    }
};

export const categoryValidationMw = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await categoryValidation.validateAsync({ ...req.body });
        const { name } = req.body
        req.body.name = name.trim();
        return next();
    } catch (err) {
        next(new UnprocessableEntity(err.message));
    }
};