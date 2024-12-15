import express from 'express';
import { uploadImage, handleImageUpload } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/upload', uploadImage, handleImageUpload);

export default router;