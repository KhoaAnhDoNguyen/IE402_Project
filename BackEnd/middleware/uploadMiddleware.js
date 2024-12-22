import multer from 'multer';

// Cấu hình multer để lưu trữ file vào bộ nhớ (memoryStorage)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware này sẽ xử lý các file được gửi với tên 'images' từ frontend (ví dụ trong FormData)
export const uploadMiddleware = upload.array('images'); // Nếu bạn gửi nhiều ảnh
