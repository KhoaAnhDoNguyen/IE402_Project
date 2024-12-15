import express from 'express';
import multer from 'multer';
import cors from 'cors';
import supabase from './lib/supabase.js'; // Ensure correct path

const app = express();
const port = 3000;

// Configure CORS to allow specific origin (your frontend)
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL
  credentials: true, // Allow credentials to be included
}));

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API for registration
app.post('/register', async (req, res) => {
  const { username, password, email, phone_number, role } = req.body;

  try {
    // Check if username or email already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('*')
      .or(`username.eq.${username},email.eq.${email}`);

    if (checkError) {
      console.error('Error checking existing users:', checkError);
      return res.status(500).json({ error: 'Error checking existing users' });
    }

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    const { error } = await supabase
      .from('users')
      .insert([{ username, password, email, phone_number, role }]);

    if (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Error registering user' });
    }

    // Respond with success message and user data
    res.status(201).json({ message: 'User registered successfully', user: { username, email, phone_number, role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// API for login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username) // Use email for login
      .single();

    if (error || !users || users.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: users });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Route for uploading images
app.post('/upload', upload.single('file'), async (req, res) => {
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
});

// API GET to fetch all images from database
app.get('/images', async (req, res) => {
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Server!');
});