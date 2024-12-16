// reviewsController.js
import supabase from '../lib/supabase.js';

// Thêm bình luận
export const addComment = async (req, res) => {
  const { userId, propertyId, comment } = req.body;

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ user_id: userId, property_id: propertyId, comment }]);

    if (error) throw error;

    res.status(201).json({ message: 'Comment added', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy bình luận cho một property cùng với thông tin người dùng
export const getCommentsByProperty = async (req, res) => {
  const { propertyId } = req.params;

  try {
    // Truy vấn để lấy bình luận
    const { data: comments, error: commentsError } = await supabase
      .from('reviews')
      .select('id, user_id, comment')
      .eq('property_id', propertyId);

    if (commentsError) throw commentsError;

    // Lấy danh sách user_id từ bình luận
    const userIds = comments.map(comment => comment.user_id);

    // Truy vấn để lấy thông tin người dùng
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, email, phone_number, avatar')
      .in('id', userIds);

    if (usersError) throw usersError;

    // Kết hợp bình luận với thông tin người dùng
    const commentsWithUser = comments.map(comment => {
      const user = users.find(user => user.id === comment.user_id);
      return {
        ...comment,
        user: user || null,
      };
    });

    res.status(200).json(commentsWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};