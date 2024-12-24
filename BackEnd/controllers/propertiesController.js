import supabase from "../lib/supabase.js";
import multer from "multer";

// Sử dụng multer để lưu trữ ảnh trong bộ nhớ tạm
const upload = multer({ storage: multer.memoryStorage() });

export const getProperties = async (req, res) => {
  try {
    const { data, error } = await supabase.from("properties").select(`
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
    let query = supabase.from("properties").select(`
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
      )
    `);

    if (districtId) query = query.eq("district_id", districtId);
    if (wardId) query = query.eq("ward_id", wardId);
    if (type) query = query.eq("type", type);
    if (minPrice || maxPrice) {
      if (minPrice) query = query.gte("price", parseFloat(minPrice));
      if (maxPrice) query = query.lte("price", parseFloat(maxPrice));
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware upload ảnh
export const uploadMiddleware = upload.array("images");

// Hàm tạo bất động sản mới với ảnh
export const createProperty = async (req, res) => {
  const userId = req.params.userId;
  
  // Tạo một đối tượng mới để lưu giá trị đã xử lý
  const processedBody = {};

  // Duyệt qua tất cả các trường trong req.body
  for (const [key, value] of Object.entries(req.body)) {
    processedBody[key] = Array.isArray(value) ? value[0] : value;
  }

  //console.log(processedBody)
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
    bathroom,
  } = processedBody;

  try {
    // Step 1: Get the highest property ID
    const { data: maxIdData, error: maxIdError } = await supabase
      .from("properties")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (maxIdError) {
      console.error("Error fetching max ID:", maxIdError);
      return res.status(500).json({ error: maxIdError.message });
    }

    // Generate new property ID
    const newId = maxIdData ? maxIdData.id + 1 : 1; // Start from 1 if no properties exist

    // Step 2: Insert property into 'properties' table with the new ID
    const { data: propertyData, error: propertyError } = await supabase
      .from("properties")
      .insert({
        id: newId, // Use the new ID here
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
        bathroom,
      })
      .select(); // Ensure data is returned

    // Check for errors
    if (propertyError) {
      console.error("Property insert error:", propertyError);
      return res.status(500).json({ error: propertyError.message });
    }

    const halfIndex = Math.floor(req.files.length / 2); // Tính chỉ số giữa
    const filesToUpload = req.files.slice(0, halfIndex); // Lấy một nửa số file

    // Step 3: Handle images and save to 'images' table
    const uploadPromises = filesToUpload.map(async (file) => {
      const fileName = `${Date.now()}_${file.originalname}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("IE402_Image")
        .upload(fileName, file.buffer, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Create public URL for the image
      const publicURL = `https://frjddntilpbemgetzbbg.supabase.co/storage/v1/object/public/IE402_Image/${fileName}`;

      // Insert image info into 'images' table
      const { error: imageError } = await supabase.from("images").insert({
        property_id: newId, // Use the ID of the property just created
        image_url: publicURL,
        alt_text: file.originalname,
      });

      if (imageError) {
        console.error("Image insert error:", imageError);
        throw imageError;
      }
    });

    // Wait for all images to be uploaded and saved
    await Promise.all(uploadPromises);

    // Successful response
    res
      .status(201)
      .json({ message: "Property created successfully", data: propertyData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesAsc = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select(
        `
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
      `
      )
      .order("price", { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertiesDesc = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("properties")
      .select(
        `
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
      `
      )
      .order("price", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("properties")
      .select(
        `
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
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hàm xóa bất động sản theo ID
export const deletePropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    // Kiểm tra xem bất động sản có tồn tại không
    const { data: propertyData, error: propertyError } = await supabase
      .from("properties")
      .select("id")
      .eq("id", id)
      .single();

    if (propertyError || !propertyData) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Xóa tất cả các ảnh liên quan đến property này
    const { data: imagesData, error: imagesError } = await supabase
      .from("images")
      .select("id")
      .eq("property_id", id);

    if (imagesError) {
      console.error("Error fetching images:", imagesError);
      return res.status(500).json({ error: imagesError.message });
    }

    // Nếu có ảnh, xóa chúng
    if (imagesData.length > 0) {
      const deleteImagesPromises = imagesData.map(async (image) => {
        return await supabase.from("images").delete().eq("id", image.id);
      });

      await Promise.all(deleteImagesPromises);
    }

    // Xóa bất động sản
    const { error: deletePropertyError } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (deletePropertyError) {
      console.error("Error deleting property:", deletePropertyError);
      return res.status(500).json({ error: deletePropertyError.message });
    }

    // Xóa thành công
    res.status(204).send(); // Trả về 204 No Content
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};