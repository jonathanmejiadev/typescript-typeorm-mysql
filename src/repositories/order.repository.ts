import Order from '../entity/Order';
import { IOrderInput } from '../interfaces/order.interface';

export const save = async (order: IOrderInput) => {
    const createdCategory = Order.create(order);
    return await Order.save(createdCategory);
};

export const findById = async (orderId: number) => {
    return await Order.findOne({ where: { id: orderId } });
};

export const findOne = async (query: object) => {
    return await Order.findOne(query);
}

export const find = async (query: object = {}) => {
    return await Order.find(query);
};

export const deleteById = async (orderId: number) => {
    return await Order.delete(orderId);
};

export const update = async (order: Order) => {
    return await Order.save(order);
};