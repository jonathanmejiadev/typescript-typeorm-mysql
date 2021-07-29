import * as userRepo from '../repositories/user.repository';
import { NotFound, BadRequest } from '@curveball/http-errors';
import { IUser } from '../interfaces/user.interface';
import Order from '../entity/Order';
import User from '../entity/User'
import Product from '../entity/Product';
import OrderLine from '../entity/OrderLine';

export const profile = async (userId: number) => {
    const user = await userRepo.findUser({ id: userId }, { select: ['id', 'username', 'email', 'wallet', 'roles'], relations: ['products'] });
    if (!user) throw new NotFound('User not found');
    return user;
};

export const deleteAccount = async (userId: number) => {
    return await userRepo.remove(userId);
};

export const findUser = async (user: IUser, opts?: object) => {
    return await userRepo.findUser(user, opts)
};

export const depositToWallet = async (userId: number, cash: number) => {
    const user = await userRepo.findUser({ id: userId });
    if (!user) throw new NotFound('User not found');
    // const deposit = user.wallet + cash;
    // return await userRepo.update(user, { wallet: deposit });
};

export const createCart = async (userId: number) => {
    try {
        const order = await Order.findOne({ where: { userId, status: 'on_cart' }, relations: ['orderLines'] });
        if (order) return order;
        let createdOrder = Order.create({ userId, status: 'on_cart', total: 0 })
        createdOrder.orderLines = [];
        return await Order.save(createdOrder);
    } catch (err) {
        throw err;
    }
};

export const getCart = async (userId: number) => {
    try {
        return await Order.findOne({ where: { userId, status: 'on_cart' } });
    } catch (err) {
        throw err;
    }
};

export const addProductToCart = async (userId: number, productId: number, quantity: number) => {
    try {
        if (!(quantity >= 1)) throw new BadRequest('Quantity must be greater than one');
        let order = await Order.findOne({ where: { userId, status: 'on_cart' }, relations: ['orderLines'] });
        if (!order) throw new NotFound('Order not found');
        let product = await Product.findOne({ id: productId });
        if (!product) throw new NotFound('Product not found');
        let createdOrderLine = OrderLine.create({
            order: order,
            productId,
            quantity,
            pricePerUnit: product.price,
            totalPrice: product.price * quantity
        });
        const savedOrderLine = await OrderLine.save(createdOrderLine);
        order.total += createdOrderLine.totalPrice;
        order.orderLines.push(savedOrderLine);
        return await Order.save(order);
    } catch (err) {
        throw err;
    }
};

export const deleteProductFromCart = async (userId: number, orderLineId: number) => {
    try {
        const orderLine = await OrderLine.findOne({ where: { id: orderLineId } });
        if (!orderLine) throw new NotFound('OrderLine not found');
        await OrderLine.delete(orderLineId);
        let order = await Order.findOne({ where: { userId, status: 'on_cart' }, relations: ['orderLines'] });
        if (!order) throw new NotFound('Order not found');
        order.total -= orderLine?.totalPrice
        return await Order.save(order);
    } catch (err) {
        throw err;
    }
};

export const updateProductFromCart = async (userId: number, orderLineId: number, quantity: number) => {
    try {
        const orderLine = await OrderLine.findOne({ where: { id: orderLineId } });
        if (!orderLine) throw new NotFound('OrderLine not found');
        let oldOrderLineTotalPrice = orderLine.totalPrice;
        orderLine.totalPrice = quantity * orderLine.pricePerUnit;
        orderLine.quantity = quantity;
        const updatedOrderLine = await OrderLine.save(orderLine);
        let order = await Order.findOne({ where: { userId, status: 'on_cart' }, relations: ['orderLines'] });
        if (!order) throw new NotFound('Order not found');
        order.total -= oldOrderLineTotalPrice;
        order.total += updatedOrderLine.totalPrice;
        return await Order.save(order);
    } catch (err) {
        throw err;
    }
}