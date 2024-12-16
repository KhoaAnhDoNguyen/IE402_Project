// reviewsRoutes.js
import express from 'express';
import { addComment, getCommentsByProperty } from '../controllers/reviewsController.js';

const router = express.Router();

// Route để thêm bình luận
router.post('/reviews', addComment);

// Route để lấy bình luận cho một property
router.get('/reviews/:propertyId', getCommentsByProperty);

export default router;