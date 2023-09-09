import { Router } from 'express';
import userControllers from '../controllers/userControllers';

const router = Router();

router.post('/register', userControllers.registerUser);
router.post('/login' ,userControllers.loginUser);
router.get('/check_login',userControllers.checkLogin);
router.get('/logout', userControllers.logoutUser);

export default router;
