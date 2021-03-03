import { Request, Response, NextFunction } from 'express';
import { HttpException } from './http-exception';
export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction): Response => {
    const statusCode = err.httpStatus || 500;
    if (statusCode === 500) err.message = 'Internal Server Error';
    return res.status(statusCode).json(({ success: 'false', error: err.title, message: err.message, code: statusCode }));
};

export const errorHandler404 = (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(404).json({ error: `Requested URL ${req.path} not found` });
};