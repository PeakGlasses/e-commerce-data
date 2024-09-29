const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ecommerce API Documentation",
    version: "1.0.0",
    description:
      "API documentation for the ecommerce platform, including all endpoints required for products, users, orders, and more.",
    contact: {
      name: "Setu Potnis",
      email: "spotnis.work@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Paths to files containing OpenAPI annotations
};

export default options;
