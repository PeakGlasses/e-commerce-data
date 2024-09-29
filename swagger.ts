// swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import options from "./swaggerConfig"; // Import the options from the previous step

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  // Serve Swagger UI at the '/api-docs' endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
