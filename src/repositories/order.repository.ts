import Order from '../entity/Order';
import { IOrder } from '../interfaces/order.interface';

export const save = async (order: IOrder) => {
    const createdCategory = Order.create(order);
    return await Order.save(createdCategory);
};

export const findById = async (orderId: number) => {
    return await Order.findOne({ where: { id: orderId } });
};

export const find = async (query: object) => {
    return await Order.find(query);
};

export const findAll = async () => {
    return await Order.find();
};

export const deleteById = async (orderId: number) => {
    return await Order.delete(orderId);
};

export const update = async (order: Order) => {
    return await Order.save(order);
};