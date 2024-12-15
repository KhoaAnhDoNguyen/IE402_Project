// propertiesRoutes.js
import express from 'express';
import { getProperties } from '../controllers/propertiesController.js';

const router = express.Router();

// Route to get all properties
router.get('/properties', getProperties);

export default router;