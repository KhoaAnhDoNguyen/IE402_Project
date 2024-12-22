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
    // Lấy danh sách property_id từ bảng favorites
    const { data: favorites, error: favoritesError } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);

    if (favoritesError) throw favoritesError;

    // Nếu không có favorites
    if (!favorites.length) {
      return res.status(200).json([]);
    }

    // Lấy thông tin chi tiết của các properties yêu thích
    const propertyIds = favorites.map(favorite => favorite.property_id);
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select(`
        id,
        name,
        street,
        latitude,
        longitude,
        type,
        price,
        description,
        availability,
        created_at,
        distance_school,
        distance_bus,
        distance_food,
        created_by,
        square,
        bedroom,
        bathroom,
        wards (
          id,
          name,
          districts (
            id,
            name
          )
        ),
        images (
          id,
          image_url,
          alt_text
        )
      `)
      .in('id', propertyIds);

    if (propertiesError) throw propertiesError;

    res.status(200).json(properties);
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