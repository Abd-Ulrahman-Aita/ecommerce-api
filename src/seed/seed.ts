import dotenv from 'dotenv';
dotenv.config(); // must be first line to load .env variables (this is a separate script that not used server.ts so we repeat command here)

import { connectDB } from '../config/db';
import User from '../models/User';
import Product from '../models/Product';
import bcrypt from 'bcryptjs';

const seed = async () => {
  await connectDB();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Upsert admin user
  let admin = await User.findOne({ email: 'admin@example.com' });

  if (!admin) {
    admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    });
    console.log('👤 Admin created');
  } else {
    console.log('👤 Admin already exists');
  }

  // Seed products
  const seedData = [
    {
      name: 'Product 1',
      description: 'Description for product 1',
      price: 100,
      stock: 50,
      sku: 'SKU-001',
      owner: admin._id,
    },
    {
      name: 'Product 2',
      description: 'Description for product 2',
      price: 200,
      stock: 30,
      sku: 'SKU-002',
      owner: admin._id,
    },
  ];

  for (const product of seedData) {
    const exists = await Product.findOne({ sku: product.sku });
    if (!exists) {
      await Product.create(product);
      console.log(`✅  Product "${product.name}" created`);
    } else {
      console.log(`ℹ️  Product with SKU "${product.sku}" already exists`);
    }
  }

  console.log('✅ Seeding completed.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});