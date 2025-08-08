import mongoose from 'mongoose';
import Order from '../models/Order';
import Product from '../models/Product';
import { UserRole } from '../models/User';
import { AppError } from '../utils/appError'; 

interface OrderItem {
  productId: string;
  quantity: number;
}

export const createOrder = async (userId: string, items: OrderItem[]) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new AppError('order.invalid_items', 400);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new AppError('order.product_not_found', 404, { id: item.productId });
      }

      if (product.stock < item.quantity) {
        throw new AppError('order.insufficient_stock', 400, { product: product.name });
      }

      product.stock -= item.quantity;
      await product.save({ session });

      totalPrice += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getUserOrders = async (userId: string) => {
  return Order.find({ user: userId })
    .populate('items.product')
    .sort({ createdAt: -1 });
};

export const getAllOrders = async (userRole: UserRole) => {
  if (userRole !== UserRole.ADMIN) {
    throw new AppError('auth.forbidden_admin', 403);
  }

  return Order.find()
    .populate('user')
    .populate('items.product')
    .sort({ createdAt: -1 });
};

export const deleteOrderById = async (id: string, userRole: UserRole) => {
  if (userRole !== UserRole.ADMIN) {
    throw new AppError('auth.forbidden_admin', 403);
  }

  const order = await Order.findById(id);
  if (!order) {
    throw new AppError('order.not_found', 404);
  }

  await order.deleteOne();
};