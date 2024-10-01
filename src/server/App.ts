/* eslint-disable @typescript-eslint/no-var-requires */
const setupSwagger = require("./swagger");
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger");
module.exports = express();

// Middleware
module.exports.use(cors());
module.exports.use(express.json());

// Setup Morgan to log HTTP requests with winston
module.exports.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim())
    }
}))

// Set up Swagger
setupSwagger(module.exports);

// Serve React frontend
module.exports.use(express.static(path.join(__dirname, "../../public")));

// Example route
/**
 * @swagger
 * /api/hello:
 *  get:
 *      summary: test api
 *      responses:
 *          200:
 *              description: success response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 */
module.exports.get("/api/hello", (req: any, res: any) => {
    res.json({ message: "Hello from Express API! 🚀" });
});

// Catch-all to serve React frontend on any route
module.exports.get("*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
});
