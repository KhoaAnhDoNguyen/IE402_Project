// authRoutes.js
import express from 'express';
import { register, login, updateUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:userId', updateUser); // Route để cập nhật thông tin người dùng với userId trong URL

export default router;