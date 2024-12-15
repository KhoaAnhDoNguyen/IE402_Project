import supabase from '../lib/supabase.js';

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