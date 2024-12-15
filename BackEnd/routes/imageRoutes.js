import express from 'express';
import { getAllImages } from '../controllers/imageController.js';

const router = express.Router();

router.get('/images', getAllImages);

export default router;