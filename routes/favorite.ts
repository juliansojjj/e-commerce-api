import { Router } from "express";
import { deleteFavorite, getUserFavorites, getItemFavorites, postFavorite } from "../controllers/favorites";

export const router = Router();

router.get('/:id',getUserFavorites);
router.get('/item/:id',getItemFavorites);
router.post('/',postFavorite);
router.delete('/:id',deleteFavorite);

export default router;
