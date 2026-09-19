import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    const { data } = await axios.get('https://fakestoreapi.com/products');

    const products = data.map((item) => ({
      name: item.title,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      stock: Math.floor(Math.random() * 50) + 10,
      rating: item.rating?.rate || 0,
      numReviews: item.rating?.count || 0,
    }));

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`${products.length} products seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
