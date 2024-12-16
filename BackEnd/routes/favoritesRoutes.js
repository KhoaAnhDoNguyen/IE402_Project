// favoritesRoutes.js
import express from 'express';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../controllers/favoritesController.js';

const router = express.Router();

// Route để thêm property vào danh sách yêu thích
router.post('/favorites', addFavorite);

// Route để lấy danh sách property yêu thích của người dùng
router.get('/favorites/:userId', getFavorites);

// Route để xóa property khỏi danh sách yêu thích
router.delete('/favorites', removeFavorite);

export default router;