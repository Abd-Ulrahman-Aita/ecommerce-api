import mongoose from 'mongoose';
import Product from '../models/Product';
import { UserRole } from '../models/User';
import { AppError } from '../utils/appError';

export const createProduct = async (
  userId: string,
  productData: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku: string;
  }
) => {
  const { name, description, price, stock, sku } = productData;

  if (!name || !price || !stock || !sku) {
    throw new AppError('product.missing_fields', 400);
  }

  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    throw new AppError('product.sku_exists', 400);
  }

  const product = new Product({
    name,
    description,
    price,
    stock,
    sku,
    owner: userId,
  });

  await product.save();

  return product;
};

export const getProducts = async () => {
  const products = await Product.find().populate('owner', 'name email');
  return products;
};

export const getProductById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('product.invalid_id', 400);
  }

  const product = await Product.findById(id).populate('owner', 'name email');

  if (!product) {
    throw new AppError('product.not_found', 404);
  }

  return product;
};

export const updateProduct = async (
  id: string,
  userId: string,
  userRole: UserRole,
  updateData: Partial<{
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
  }>
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('product.invalid_id', 400);
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new AppError('product.not_found', 404);
  }

  // Check if user is owner and admin
  if (product.owner.toString() !== userId && userRole !== UserRole.ADMIN) {
    throw new AppError('auth.unauthorized', 403);
  }

  // Check sku if existed before
  if (updateData.sku && updateData.sku !== product.sku) {
    const skuExists = await Product.findOne({ sku: updateData.sku });
    if (skuExists) {
      throw new AppError('product.sku_exists', 400);
    }
  }

  Object.assign(product, updateData);

  await product.save();

  return product;
};

export const deleteProduct = async (
  id: string,
  userId: string,
  userRole: UserRole
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('product.invalid_id', 400);
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new AppError('product.not_found', 404);
  }

  // Check if user is owner and admin
  if (product.owner.toString() !== userId && userRole !== UserRole.ADMIN) {
    throw new AppError('auth.unauthorized', 403);
  }

  await product.deleteOne();

  return;
};
