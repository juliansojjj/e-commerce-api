import { Router } from "express";
import { getUserCart, postItemToCart, deleteCartItem, updateCartItemAmount } from "../controllers/checkout";

export const router = Router();

router.get('/cart/:id',getUserCart);
router.post('/cart',postItemToCart);
router.put('/cart/:id',updateCartItemAmount);
router.delete('/cart/:id',deleteCartItem);

export default router;
