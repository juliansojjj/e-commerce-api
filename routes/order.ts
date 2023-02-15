import { Router } from "express";
import { getUserOrders, getUniqueOrder, getOrderCart} from '../controllers/orders';

export const router = Router();

router.get('/:id',getUniqueOrder);
router.get('/cart/:id',getOrderCart);
router.get('/user/:id',getUserOrders);

export default router;
