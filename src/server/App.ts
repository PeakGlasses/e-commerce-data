/* eslint-disable @typescript-eslint/no-var-requires */
const setupSwagger = require("./swagger");
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./logger");
const userRoutes = require("./routes/UserRoutes");

const application = express();

// Middleware
application.use(cors());
application.use(express.json());

// Setup Morgan to log HTTP requests with winston
application.use(morgan("combined", {
    stream: {
        write: (message: string) => logger.info(message.trim())
    }
}))

// Set up Swagger
setupSwagger(application);

// Serve React frontend
application.use(express.static(path.join(__dirname, "../../public")));

application.use("/api/users", userRoutes);

// Catch-all to serve React frontend on any route
application.get("*", (req: any, res: any) => {
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

module.exports = application
