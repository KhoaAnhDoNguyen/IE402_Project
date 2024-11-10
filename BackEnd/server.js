import express from 'express';
import multer from 'multer';
import cors from 'cors';
import supabase from './lib/supabase.js'; // Đảm bảo đường dẫn đúng

const app = express();
const port = 3000;

// Sử dụng CORS middleware
app.use(cors());
app.use(express.json());  // Để xử lý body json

// Cấu hình multer để lưu trữ tạm thời
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route để xử lý việc tải ảnh lên
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileName = `${Date.now()}_${req.file.originalname}`;  // Tạo tên file duy nhất
    
    // Tải ảnh lên Supabase Storage
    const { data, error } = await supabase.storage
      .from('IE402_Image') // Tên bucket của bạn
      .upload(fileName, req.file.buffer, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file to Supabase:', error);
      throw error;
    }

    // Tạo URL công khai cho ảnh
    const publicURL = `https://frjddntilpbemgetzbbg.supabase.co/storage/v1/object/public/IE402_Image/${fileName}`;

    console.log('Image URL:', publicURL);  // In ra URL công khai của ảnh

    // Lưu thông tin ảnh vào bảng 'images'
    const { error: dbError } = await supabase
      .from('images')
      .insert([
        {
          property_id: req.body.property_id || 1,  // Lấy property_id từ body hoặc mặc định là 1
          image_url: publicURL,  // Lưu URL vào cột 'image_url'
          alt_text: req.body.alt_text || '',  // Lấy alt_text từ body hoặc để rỗng
        },
      ]);

    if (dbError) {
      console.error('Error saving to database:', dbError);
      throw dbError;
    }

    res.status(200).json({ message: 'File uploaded and information saved successfully', imageUrl: publicURL });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file or saving to database', details: error.message });
  }
});

// API GET để lấy tất cả hình ảnh từ database
app.get('/images', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('images')
      .select('*');

    if (error) {
      console.error('Error fetching images:', error);
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Server!');
});