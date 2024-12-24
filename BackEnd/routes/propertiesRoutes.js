import express from 'express';
import { getProperties, getFilteredProperties, createProperty, getPropertiesAsc, getPropertiesDesc,
    getPropertyById,   deletePropertyById , getPropertyByUserId // Nhập hàm xóa

} from '../controllers/propertiesController.js';
import { validateUserId } from '../middleware/authMiddleware.js'; 
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Route để lấy tất cả properties
router.get('/properties', getProperties);

// Route để lấy properties đã lọc
router.get('/properties/filter', getFilteredProperties);

// Route để tạo property mới với xác thực userId
router.post('/properties/:userId', validateUserId, uploadMiddleware,  createProperty); // Sử dụng middleware ở đây

// Route để lấy danh sách properties theo giá tăng dần
router.get('/properties/asc', getPropertiesAsc);

// Route để lấy danh sách properties theo giá giảm dần
router.get('/properties/desc', getPropertiesDesc);

// Route để lấy thông tin một property theo ID
router.get('/properties/:id', getPropertyById);

router.delete('/properties/:id', deletePropertyById); // Thêm route xóa

router.get('/properties/user/:userId', getPropertyByUserId);

export default router;
