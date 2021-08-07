import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import config from '../config'; import mercadopago from 'mercadopago';
import * as orderRepo from '../repositories/order.repository';
import { NotFound } from '@curveball/http-errors/dist';
import Axios from 'axios';

const mercadoPagoRouter = Router();

const { MP_ACCESS_TOKEN } = config;

mercadopago.configure({
    access_token: MP_ACCESS_TOKEN || 'mp_access_token'
});

// MercadoPago Url Generate
mercadoPagoRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId } = req.body;

        const cart = await orderRepo.findOne({ where: { id: orderId }, relations: ['orderLines'] });
        if (!cart) throw new NotFound('Order not found')

        const items = cart.orderLines.map((orderLine) => {
            return {
                title: orderLine.product.name,
                unit_price: orderLine.pricePerUnit,
                quantity: orderLine.quantity
            };
        });

        let preference = {
            items,
            external_reference: `${orderId}`,
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "atm"
                    }
                ],
                installments: 3  //Maximum payments
            },
            back_urls: {
                success: 'http://localhost:3000/checkout/payments',
                failure: 'http://localhost:3000/checkout/payments',
                pending: 'http://localhost:3000/checkout/payments',
            }
        };

        let response = await mercadopago.preferences.create(preference);
        console.log(response.body);
        return res.json({ success: true, id: response.body.id })

    } catch (err) {
        next(err);
    };
});

// Update order with MercadoPago payment status
mercadoPagoRouter.get('/payments', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payment_id = req.query.payment_id;
        const payment_status = req.query.status;
        const external_reference = req.query.external_reference;
        const merchant_order_id = req.query.merchant_order_id;

        console.log(`External Reference: ${external_reference}`);
        let order = await orderRepo.findById(Number(external_reference));
        if (!order) throw new NotFound('Order not found');
        order.payment_id = Number(payment_id);
        order.payment_status = payment_status?.toString() || '';
        order.merchant_order_id = Number(merchant_order_id);
        order.status = 'completed';

        await orderRepo.save(order);
    } catch (err) {
        next(err);
    };
});

// Get information from Mercado Pago about an order
mercadoPagoRouter.get('/payments/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mpAPI = `https://api.mercadopago.com`;
        const { id } = req.params;

        const payment = await Axios.get(`${mpAPI}/v1/payments/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${MP_ACCESS_TOKEN}}`
                }
            });

        return res.status(200).json({ success: true, data: payment });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

export default mercadoPagoRouter;