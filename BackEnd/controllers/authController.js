import supabase from '../lib/supabase.js';
import multer from "multer";

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// API for registration
export const register = async (req, res) => {
  const { username, password, email, phone_number, role } = req.body;

  try {
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

    res.status(201).json({ message: 'User registered successfully', user: { username, email, phone_number, role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// API for login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username)
      .single();

    if (error || !users || users.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: users });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

// API for updating user information
export const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, phone_number, role, password } = req.body;
  
  // Handle file upload if it exists
  let avatarUrl = "";
  if (req.file) { // Use req.file for single file
    const avatarFile = req.file; // Get the uploaded file
    const fileName = `avatars/${Date.now()}_${avatarFile.originalname}`;

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("IE402_Image")
      .upload(fileName, avatarFile.buffer, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return res.status(500).json({ error: 'Error uploading avatar image.' });
    }

    // Create public URL for the image
    avatarUrl = `https://frjddntilpbemgetzbbg.supabase.co/storage/v1/object/public/IE402_Image/${fileName}`; // Replace with your Supabase URL
  }

  const updates = {};
  if (username) updates.username = username;
  if (email) updates.email = email;
  if (phone_number) updates.phone_number = phone_number;
  if (role) updates.role = role;
  if (avatarUrl) updates.avatar = avatarUrl; // Save the public URL if uploaded
  if (password) updates.password = password;

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Error updating user' });
    }

    res.status(200).json({ message: 'User updated successfully', data });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};