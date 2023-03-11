import { Router } from "express";
import { deleteProduct, getProduct, getProductByName, getProductByType, getProducts, postProduct, putProduct, getProductsBySN } from '../controllers/products';

export const router = Router();

router.get('/',getProducts);
router.get('/search/:name',getProductByName);
router.get('/:id',getProduct);
router.get('/models/:SN',getProductsBySN);
router.get('/model/:name',getProductByType);
router.post('/',postProduct);
router.put('/:id',putProduct);
router.delete('/:id',deleteProduct);

export default router;
