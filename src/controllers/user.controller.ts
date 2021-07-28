import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const profile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const user = await userService.profile(userId)
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    };
};

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        await userService.deleteAccount(userId)
        return res.status(200).json({
            success: true,
            message: 'Account has been deleted'
        });
    } catch (err) {
        next(err);
    };
};

export const deposit = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    const { cash } = req.body;
    try {
        const user = await userService.depositToWallet(userId, cash);
        return res.status(200).json({
            success: true,
            message: 'The transaction has been successful',
            data: user
        });
    } catch (err) {
        next(err);
    };
};

export const createCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const createdCart = await userService.createCart(userId, {})
        res.status(201).json({ success: true, message: 'cart created', data: createdCart });
    } catch (err) {
        next(err)
    }
};

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    try {
        const cart = await userService.getCart(userId);
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        next(err)
    }
}
export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user;
    const { productId, quantity } = req.body;
    try {
        const order = await userService.addProductToCart(userId, productId, quantity);
        res.status(200).json({ success: true, message: 'Product added to user cart', data: order });
    } catch (err) {
        next(err)
    }
};