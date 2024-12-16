import express from 'express';
import { getProperties, getFilteredProperties, createProperty , getPropertiesAsc, getPropertiesDesc } from '../controllers/propertiesController.js';
import { validateUserId } from '../middleware/authMiddleware.js'; // Đổi tên import

const router = express.Router();

// Route để lấy tất cả properties
router.get('/properties', getProperties);

// Route để lấy properties đã lọc
router.get('/properties/filter', getFilteredProperties);

// Route để tạo property mới với xác thực userId
router.post('/properties/:userId', validateUserId, createProperty); // Sử dụng middleware ở đây

// Route để lấy danh sách properties theo giá tăng dần
router.get('/properties/asc', getPropertiesAsc);

// Route để lấy danh sách properties theo giá giảm dần
router.get('/properties/desc', getPropertiesDesc);

export default router;