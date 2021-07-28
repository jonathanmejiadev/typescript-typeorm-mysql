import * as userRepo from '../repositories/user.repository';
import { NotFound } from '@curveball/http-errors';
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

export const createCart = async (userId: number, cart: object) => {
    let createdOrder = await Order.create({ userId, status: 'on_cart', total: 0 })
    createdOrder.orderLines = [];
    console.log(createdOrder);
    return await Order.save(createdOrder);
};

export const getCart = async (userId: number) => {
    return await Order.findOne({ where: { userId, status: 'on_cart' }, relations: ['orderLines'] });
};

export const addProductToCart = async (userId: number, productId: number, quantity: number) => {
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
    console.log(order);
    const savedOrderLine = await OrderLine.save(createdOrderLine);
    order.total += createdOrderLine.totalPrice;
    order.orderLines.push(savedOrderLine);
    return await Order.save(order);
};

