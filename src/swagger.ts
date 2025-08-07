import swaggerJSDoc from 'swagger-jsdoc';

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
        url: 'http://localhost:3000/api/v1',
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
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/models/*.ts'], // مكان ملفات الـ JSDoc لتعريف ال APIs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
