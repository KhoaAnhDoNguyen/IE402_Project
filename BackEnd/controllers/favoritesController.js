// favoritesController.js
import supabase from '../lib/supabase.js';

// Thêm property vào danh sách yêu thích
export const addFavorite = async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, property_id: propertyId }]);

    if (error) throw error;

    res.status(201).json({ message: 'Property added to favorites', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách property yêu thích của người dùng
export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa property khỏi danh sách yêu thích
export const removeFavorite = async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, property_id: propertyId });

    if (error) throw error;

    res.status(200).json({ message: 'Property removed from favorites', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};