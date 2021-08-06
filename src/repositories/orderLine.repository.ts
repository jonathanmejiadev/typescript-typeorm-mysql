import OrderLine from '../entity/OrderLine';
import { IOrderLineInput } from '../interfaces/orderLine.interface';

export const save = async (orderLine: IOrderLineInput) => {
    const createdOrderLine = OrderLine.create(orderLine);
    return await OrderLine.save(createdOrderLine);
};

export const findById = async (orderLineId: number) => {
    return await OrderLine.findOne({ where: { id: orderLineId } });
};

export const findOne = async (query: object) => {
    return await OrderLine.findOne(query);
}

export const find = async (query: object = {}) => {
    return await OrderLine.find(query);
};

export const deleteById = async (orderLineId: number) => {
    return await OrderLine.delete(orderLineId);
};

export const update = async (orderLine: OrderLine) => {
    return await OrderLine.save(orderLine);
};