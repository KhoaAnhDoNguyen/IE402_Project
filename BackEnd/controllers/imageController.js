import supabase from '../lib/supabase.js';

// API GET to fetch all images from database
export const getAllImages = async (req, res) => {
  try {
    const { data, error } = await supabase.from('images').select('*');

    if (error) {
      console.error('Error fetching images:', error);
      return res.status(500).json({ error: 'Error fetching images' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
};