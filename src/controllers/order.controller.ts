import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { status } = req.query;
        if (!status) status = '';
        const orders = await orderService.getOrders(status.toString());
        return res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    };
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrder(Number(id));
        return res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    };
};

export const changeOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await orderService.changeOrderStatus(Number(id), status);
        return res.status(200).json({ success: true, data: order });
    } catch (err) {
        next(err);
    };
};