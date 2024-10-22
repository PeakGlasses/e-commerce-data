import setupSwagger from "./swagger";
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger";
import userRoutes from "./routes/UserRoute";
import productRoutes from "./routes/ProductRoute";

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
application.use("/api/products", productRoutes);

// Catch-all to serve React frontend on any route
application.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

export default application
