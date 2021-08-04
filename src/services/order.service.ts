import { NotFound } from '@curveball/http-errors/dist';
import Order from '../entity/Order';
import { IOrder } from '../interfaces/order.interface';

export const getOrders = async (status: string) => {
    try {
        let statusQuery = status ? { where: { status } } : {};
        return await Order.find(statusQuery);
    } catch (err) {
        throw err;
    };
};

export const getOrder = async (orderId: number) => {
    try {
        const order = await Order.find({ where: { id: orderId } });
        if (!order) throw new NotFound('Order not found');
        return order;
    } catch (err) {
        throw err;
    };
};


export const changeOrderStatus = async (orderId: number, status: string) => {
    try {
        let order = await Order.findOne({ where: { id: orderId } });
        if (!order) throw new NotFound('Order not found');
        order.status = status;
        return await Order.save(order);
    } catch (err) {
        throw err;
    };
};