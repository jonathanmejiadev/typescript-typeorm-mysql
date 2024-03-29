import * as userRepo from '../repositories/user.repository';
import { NotFound, BadRequest } from '@curveball/http-errors';
import { IOrderLineInput } from '../interfaces/orderLine.interface';
import * as orderRepo from '../repositories/order.repository';
import * as orderLineRepo from '../repositories/orderLine.repository';
import * as productRepo from '../repositories/product.repository';

export const getProfile = async (userId: number) => {
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFound('User not found');
    return user;
};

export const deleteAccount = async (userId: number) => {
    return await userRepo.deleteById(userId);
};

export const findById = async (userId: number) => {
    return await userRepo.findById(userId);
};

export const findOne = async (query: object = {}) => {
    return await userRepo.findOne(query);
};

export const findAll = async (query: object = {}) => {
    return await userRepo.find(query);
};


export const createCart = async (userId: number) => {
    try {
        const order = await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
        if (order) return order;
        return await orderRepo.save({ userId, status: 'on_cart', total: 0 });
    } catch (err) {
        throw err;
    };
};

export const getCart = async (userId: number) => {
    try {
        return await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
    } catch (err) {
        throw err;
    };
};

export const createOrderLine = async ({ order, productId, quantity, pricePerUnit, totalPrice }: IOrderLineInput) => {
    try {
        let newOrderLine = {
            order,
            productId,
            quantity,
            pricePerUnit,
            totalPrice
        };
        return await orderLineRepo.save(newOrderLine);
    } catch (err) {
        throw err;
    };
};

export const addProductToCart = async (userId: number, productId: number, quantity: number) => {
    try {
        if (!(quantity >= 1)) throw new BadRequest('Quantity must be greater than one');
        let order = await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
        if (!order) throw new NotFound('Order not found');
        let product = await productRepo.findOne({ where: { id: productId } });
        if (!product) throw new NotFound('Product not found');
        let orderLine = {
            order,
            productId,
            quantity,
            pricePerUnit: product.price,
            totalPrice: product.price * quantity
        };
        const savedOrderLine = await createOrderLine(orderLine);
        order.total += savedOrderLine.totalPrice;
        order.orderLines.push(savedOrderLine);
        return await orderRepo.update(order);
    } catch (err) {
        throw err;
    };
};

export const deleteProductFromCart = async (userId: number, orderLineId: number) => {
    try {
        const orderLine = await orderLineRepo.findOne({ where: { id: orderLineId } });
        if (!orderLine) throw new NotFound('OrderLine not found');
        await orderLineRepo.deleteById(orderLineId);
        let order = await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
        if (!order) throw new NotFound('Order not found');
        order.total -= orderLine?.totalPrice
        return await orderRepo.update(order);
    } catch (err) {
        throw err;
    };
};

export const updateProductFromCart = async (userId: number, orderLineId: number, quantity: number) => {
    try {
        if (!(quantity >= 1)) throw new BadRequest('Quantity must be greater than one');
        const orderLine = await orderLineRepo.findOne({ where: { id: orderLineId } });
        if (!orderLine) throw new NotFound('OrderLine not found');
        let oldOrderLineTotalPrice = orderLine.totalPrice;
        orderLine.totalPrice = quantity * orderLine.pricePerUnit;
        orderLine.quantity = quantity;
        const updatedOrderLine = await orderLineRepo.update(orderLine);
        let order = await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
        if (!order) throw new NotFound('Order not found');
        order.total -= oldOrderLineTotalPrice;
        order.total += updatedOrderLine.totalPrice;
        return await orderRepo.update(order);
    } catch (err) {
        throw err;
    };
};

export const getEmptyCart = async (userId: number) => {
    try {
        let order = await orderRepo.findOne({ where: { userId, status: 'on_cart' } });
        if (!order) throw new NotFound('Order not found');
        await Promise.all(order.orderLines.map(async orderLine => orderLineRepo.deleteById(orderLine.id)));
        order.total = 0;
        order.orderLines = [];
        return await orderRepo.update(order);
    } catch (err) {
        throw err;
    };
};

export const getUserOrders = async (userId: number) => {
    return await orderRepo.find({ where: { userId } });
};

export const getUserOrder = async (userId: number, orderId: number) => {
    return await orderRepo.findOne({ where: { userId, id: orderId } });
};