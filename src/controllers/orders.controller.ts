import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orders.service';
import { AuthenticatedRequest } from '../types/express';
import { sendSuccess, sendCreated } from '../utils/response';

// POST /orders - Create a new order
export const createOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.createOrder(req.user!._id.toString(), req.body.items);
    return sendCreated(req, res, 'order.created_success', { order });
  } catch (err) {
    next(err);
  }
};

// GET /orders - Get user orders
export const getUserOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getUserOrders(req.user!._id.toString());
    return sendSuccess(req, res, 'order.user_orders_success', { orders });
  } catch (err) {
    next(err);
  }
};

// GET /orders/all - Get all orders (admin only)
export const getAllOrders = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getAllOrders(req.user!.role);
    return sendSuccess(req, res, 'order.all_orders_success', { orders });
  } catch (err) {
    next(err);
  }
};

// DELETE /orders/:id - Delete order (admin only)
export const deleteOrderById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await orderService.deleteOrderById(req.params.id, req.user!.role);
    return sendSuccess(req, res, 'order.deleted_success');
  } catch (err) {
    next(err);
  }
};