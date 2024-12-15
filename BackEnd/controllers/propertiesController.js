// propertiesController.js
import supabase from '../lib/supabase.js';

export const getProperties = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        id,
        name,
        street,
        price,
        description,
        availability,
        created_at,
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
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};