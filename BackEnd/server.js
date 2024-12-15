// server.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js'; // Import properties routes
import supabase from './lib/supabase.js';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL
  credentials: true,
}));

app.use(express.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', imageRoutes);
app.use('/api', propertiesRoutes); // Use properties routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Server!');
});