import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/products.service';
import { AuthenticatedRequest } from '../types/express';
import {
  sendSuccess,
  sendCreated,
} from '../utils/response';

// POST /products - Create a new product
export const createProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const product = await productService.createProduct(
      req.user!._id.toString(), 
      req.body
    );
    return sendCreated(req, res, 'product.created_success', { product });
  } catch (err) {
    next(err);
  }
};

// GET /products - List all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getProducts();
    return sendSuccess(req, res, 'product.list_success', { products });
  } catch (err) {
    next(err);
  }
};

// GET /products/:id - Get product details
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return sendSuccess(req, res, 'product.details_success', { product });
  } catch (err) {
    next(err);
  }
};

// PATCH /products/:id - Update product (owner or admin only)
export const updateProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.user!._id.toString(),
      req.user!.role,
      req.body
    );
    return sendSuccess(req, res, 'product.updated_success', { product });
  } catch (err) {
    next(err);
  }
};

// DELETE /products/:id - Delete product (owner and admin only)
export const deleteProduct = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await productService.deleteProduct(
      req.params.id, 
      req.user!._id.toString(), 
      req.user!.role
    );
    return sendSuccess(req, res, 'product.deleted_success');
  } catch (err) {
    next(err);
  }
};