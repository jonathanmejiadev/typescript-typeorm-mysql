import { NotFound } from '@curveball/http-errors/dist';
import * as orderRepo from '../repositories/order.repository';

export const getOrders = async (status: string) => {
    try {
        let statusQuery = status ? { where: { status } } : {};
        return await orderRepo.find(statusQuery);
    } catch (err) {
        throw err;
    };
};

export const getOrder = async (orderId: number) => {
    try {
        const order = await orderRepo.find({ where: { id: orderId } });
        if (!order) throw new NotFound('Order not found');
        return order;
    } catch (err) {
        throw err;
    };
};


export const changeOrderStatus = async (orderId: number, status: string) => {
    try {
        let order = await orderRepo.findById(orderId);
        if (!order) throw new NotFound('Order not found');
        order.status = status;
        return await orderRepo.update(order);
    } catch (err) {
        throw err;
    };
};