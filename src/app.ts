import express from 'express';
import cors from 'cors';
import i18n from './utils/i18n';
import { connectDB } from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';
import { globalErrorHandler } from './middlewares/error.middleware';
import { langMiddleware } from './middlewares/lang.middleware';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(i18n.init);
app.use(langMiddleware);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// Handling App Errors
app.use(globalErrorHandler);

export default app;