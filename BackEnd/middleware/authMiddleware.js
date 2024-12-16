// middleware/authMiddleware.js
import supabase from '../lib/supabase.js';

export const validateUserId = async (req, res, next) => {
  const userId = req.params.userId; // Lấy userId từ tham số URL

  // Kiểm tra xem userId có tồn tại trong cơ sở dữ liệu không
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single(); // Lấy một bản ghi

  if (error || !data) {
    return res.status(404).json({ error: 'User not found' }); // Nếu không tìm thấy người dùng
  }

  // Nếu tìm thấy, tiếp tục đến middleware tiếp theo hoặc route handler
  next();
};