import { Router } from "express";
import { addUser, getUsers, deleteUser, signInUser } from "../controllers/user";
import validateToken from "./validateToken";

export const router = Router();

router.get('/', validateToken, getUsers);
router.post('/',addUser);
router.post('/sign', signInUser);
router.delete('/:id', validateToken, deleteUser);

export default router;
