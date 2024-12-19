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
      ),
      images (
        id,
        image_url,
        alt_text
      )  // Thêm thông tin hình ảnh
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

// Hàm tạo property mới
export const createProperty = async (req, res) => {
  const userId = req.params.userId; // Lấy userId từ tham số URL

  const { 
    name, 
    street, 
    latitude, 
    longitude, 
    type, 
    price, 
    description, 
    availability, 
    district_id, 
    ward_id, 
    distance_school, 
    distance_bus, 
    distance_food, 
    square, 
    bedroom, 
    bathroom 
  } = req.body;

  try {
    // Lấy tất cả các ID hiện tại
    const { data: existingProperties, error: fetchError } = await supabase
      .from('properties')
      .select('id');

    if (fetchError) throw fetchError;

    // Tìm ID lớn nhất
    const existingIds = existingProperties.map(prop => prop.id);
    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    console.log(existingIds, newId)
    // Chèn bản ghi mới với ID đã tạo
    const { data, error } = await supabase
      .from('properties')
      .insert([{
        id: newId, // Sử dụng ID được tạo
        name,
        street,
        latitude,
        longitude,
        type,
        price,
        description,
        availability,
        created_by: userId,
        district_id,
        ward_id,
        distance_school,
        distance_bus,
        distance_food,
        square,
        bedroom,
        bathroom
      }]);

    if (error) throw error;

    res.status(201).json({ message: 'Property created successfully', data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesAsc = async (req, res) => {
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
      `)
      .order('price', { ascending: true }); // Sắp xếp theo giá tăng dần

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesDesc = async (req, res) => {
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
      `)
      .order('price', { ascending: false }); // Sắp xếp theo giá giảm dần

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params; // Lấy id từ params

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
      `)
      .eq('id', id) // Lọc theo ID
      .single(); // Chỉ lấy một bản ghi

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};