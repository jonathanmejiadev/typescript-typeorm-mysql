import Order from '../entity/Order'

export interface IOrderLineInput {
    order: Order,
    productId: number,
    quantity: number,
    pricePerUnit: number,
    totalPrice: number
};