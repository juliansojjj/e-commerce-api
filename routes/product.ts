import { Router } from "express";
import { deleteProduct, getProduct, getProductCategories, getProductByName, getProductByType, getProducts, postProduct, putProduct, getProductsBySN, getProductByCategory, getProductByNameInCategory } from '../controllers/products';

export const router = Router();

router.get('/',getProducts);
router.get('/:id',getProduct);
router.get('/search/:name',getProductByName);
router.get('/models/:SN',getProductsBySN);
router.get('/model/:name',getProductByType);

router.get('/categories/all',getProductCategories);
router.get('/category/:name',getProductByCategory);
router.get('/category/search/:name',getProductByNameInCategory);

router.post('/',postProduct);
router.put('/:id',putProduct);
router.delete('/:id',deleteProduct);

export default router;
