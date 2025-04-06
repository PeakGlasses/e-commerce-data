import setupSwagger from "./swagger";
import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger";
import productRoutes from "./routes/ProductRoute";
import paymentRoutes from "./routes/PaymentRoute";

const application = express();

// Middleware
application.use(cors());
application.use(express.json());

// Setup Morgan to log HTTP requests with winston
application.use(
    morgan("combined", {
        stream: {
            write: (message: string) => logger.info(message.trim()),
        },
    })
);

// Set up Swagger
setupSwagger(application);

// Serve React frontend
application.use(express.static(path.join(__dirname, "../../public")));

// used
application.use("/api/products", productRoutes);
application.use("/api/payments", paymentRoutes);

// Catch-all to serve React frontend on any route
application.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

export default application;
