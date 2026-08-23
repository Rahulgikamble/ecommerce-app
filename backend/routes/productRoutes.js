import express from 'express';
import { getProducts, getProductById, getCategories } from '../controllers/productController.js';

const router = express.Router();

// IMPORTANT: /categories must come before /:id so it isn't treated as an id
router.get('/categories', getCategories);
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
