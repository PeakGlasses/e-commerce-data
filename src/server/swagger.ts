/* eslint-disable @typescript-eslint/no-var-requires */
// swagger.ts
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { Express } = require("express");
const options = require("./swaggerConfig"); // Import the options from the previous step

const swaggerSpec = swaggerJSDoc(options);

export default (app: typeof Express): void => {
    // Serve Swagger UI at the '/api-docs' endpoint
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
