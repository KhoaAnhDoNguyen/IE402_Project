import supabase from '../lib/supabase.js';

export const getProperties = async (req, res) => {
  try {
    const { data, error } = await supabase
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
      `);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFilteredProperties = async (req, res) => {
  const { districtId, wardId, type, minPrice, maxPrice } = req.query;

  try {
    let query = supabase.from('properties').select(`
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
        district_id
      ),
      districts (
        id,
        name
      )
    `);

    // Lọc theo district_id nếu có
    if (districtId) {
      query = query.eq('district_id', districtId);
    }

    // Lọc theo ward_id nếu có
    if (wardId) {
      query = query.eq('ward_id', wardId);
    }

    // Lọc theo type nếu có
    if (type) {
      query = query.eq('type', type);
    }

    // Lọc theo khoảng giá nếu có
    if (minPrice || maxPrice) {
      if (minPrice) {
        query = query.gte('price', parseFloat(minPrice));
      }
      if (maxPrice) {
        query = query.lte('price', parseFloat(maxPrice));
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};