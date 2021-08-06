export interface IOrder {
    id: number,
    total: number,
    status: string,
    payment_id: number,
    payment_status: string,
    merchant_order_id: number,
    userId: number,
};

export interface IOrderInput {
    total: number,
    status: string,
    userId: number,
};