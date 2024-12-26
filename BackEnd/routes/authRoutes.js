// authRoutes.js
import express from 'express';
import multer from 'multer';
import { register, login, updateUser } from '../controllers/authController.js';

const router = express.Router();
const upload = multer(); // Initialize multer for file uploads

// Define routes
router.post('/register', register);
router.post('/login', login);
router.put('/update/:userId', upload.single('avatar'), updateUser); // Use multer middleware to handle file uploads

export default router;