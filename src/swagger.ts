import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple E-Commerce API',
      version: '1.0.0',
      description: 'Backend API for a simple e-commerce platform',
      contact: {
        name: 'Abd Ulrahman Aita',
        email: 'abd.ulrahman.aitaa@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      parameters: {
        AcceptLanguageHeader: {
          name: 'Accept-Language',
          in: 'header',
          description: 'Language preference for the response (e.g., "en", "ar")',
          required: false,
          schema: {
            type: 'string',
            example: 'en',
          },
        },
      },
      schemas: {
        OrderItem: {
          type: 'object',
          properties: {
            product: { type: 'string', description: 'Product ID' },
            quantity: { type: 'integer', description: 'Quantity ordered' },
            priceAtPurchase: { type: 'number', description: 'Price at purchase time' },
          },
          required: ['product', 'quantity', 'priceAtPurchase'],
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'Order ID' },
            user: { type: 'string', description: 'User ID who placed the order' },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' },
              description: 'Array of order items',
            },
            totalPrice: { type: 'number', description: 'Total price of the order' },
            createdAt: { type: 'string', format: 'date-time', description: 'Order creation date' },
          },
          required: ['_id', 'user', 'items', 'totalPrice', 'createdAt'],
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [], // <---- This enforces authentication on all endpoints
    //   },
    // ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'], // locations to place the JSDoc comments for API documentation
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;