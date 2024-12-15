import multer from 'multer';
import supabase from '../lib/supabase.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadImage = upload.single('file');

export const handleImageUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileName = `${Date.now()}_${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from('IE402_Image')
      .upload(fileName, req.file.buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file to Supabase:', error);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const publicURL = `https://frjddntilpbemgetzbbg.supabase.co/storage/v1/object/public/IE402_Image/${fileName}`;

    const { error: dbError } = await supabase
      .from('images')
      .insert([{ property_id: req.body.property_id || 1, image_url: publicURL, alt_text: req.body.alt_text || '' }]);

    if (dbError) {
      console.error('Error saving to database:', dbError);
      return res.status(500).json({ error: 'Error saving to database' });
    }

    res.status(200).json({ message: 'File uploaded successfully', imageUrl: publicURL });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file or saving to database' });
  }
};