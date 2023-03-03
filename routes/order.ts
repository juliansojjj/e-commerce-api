import { Router } from "express";
import { getUserOrders, getUniqueOrder, getOrderCart, fulfillOrderPayment, updateOrderSucursal } from '../controllers/orders';

export const router = Router();

router.get('/:id',getUniqueOrder);
router.get('/cart/:id',getOrderCart);
router.get('/user/:id',getUserOrders);
router.put('/fulfill/:id',fulfillOrderPayment);
router.put('/sucursal/:id',updateOrderSucursal);

export default router;
