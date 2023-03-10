import { Router } from "express";
import { addUser, verifyUser, checkVerifyUser, getUsers, deleteUser, signInUser, oAuth } from "../controllers/user";
import validateToken from "./validateToken";

export const router = Router();

router.get('/', validateToken, getUsers);
router.post('/',addUser);
router.get('/verify/:id', checkVerifyUser);
router.put('/verify/:id', verifyUser);
router.post('/sign', signInUser);
router.post('/oAuthSign', oAuth);
router.delete('/:id', validateToken, deleteUser);

export default router;
