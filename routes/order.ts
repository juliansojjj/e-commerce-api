import { Router } from "express";
import { getUserOrders, getUniqueOrder, getOrderCart, fulfillOrderPayment, getCurrentOrder } from '../controllers/orders';

export const router = Router();

router.get('/:id',getUniqueOrder);
router.get('/current/:id',getCurrentOrder);
router.get('/cart/:id',getOrderCart);
router.get('/user/:id',getUserOrders);
router.put('/fulfill/:id',fulfillOrderPayment);

export default router;
