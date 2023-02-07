import { Router } from "express";
import { getUserCart, postItemToCart, deleteCartItem, updateCartItemAmount} from '../controllers/checkout';
import { getUserAddresses, postAddress, deleteAddress, getOldAddress, updateAddress } from "../controllers/checkout";

export const router = Router();

router.get('/cart/:id',getUserCart);
router.post('/cart',postItemToCart);
router.put('/cart/:id',updateCartItemAmount);
router.delete('/cart/:id',deleteCartItem);

router.get('/address/:id', getUserAddresses);
router.get('/address/old/:id', getOldAddress);
router.post('/address', postAddress);
router.put('/address/:id', updateAddress);
router.delete('/address/:id', deleteAddress);

export default router;
