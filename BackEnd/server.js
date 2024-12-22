import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import propertiesRoutes from './routes/propertiesRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import reviewsRoutes from './routes/reviewsRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'; 

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.use(express.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', imageRoutes);
app.use('/api', propertiesRoutes);
app.use('/api', favoritesRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', bookingRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to Server!');
});
