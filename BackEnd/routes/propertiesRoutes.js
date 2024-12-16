// propertiesRoutes.js
import express from 'express';
import { getProperties, getFilteredProperties } from '../controllers/propertiesController.js';

const router = express.Router();

// Route to get all properties
router.get('/properties', getProperties);

// Route to get filtered properties
router.get('/properties/filter', getFilteredProperties);

export default router;