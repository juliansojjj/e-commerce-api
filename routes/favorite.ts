import { Router } from "express";
import { deleteFavorite, getUserFavorites, postFavorite } from "../controllers/favorites";

export const router = Router();

router.get('/:id',getUserFavorites);
router.post('/',postFavorite);
router.delete('/:id',deleteFavorite);

export default router;
