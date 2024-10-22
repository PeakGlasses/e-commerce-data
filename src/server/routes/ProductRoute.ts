import { Router } from "express";
import { productController } from "../controllers/ProductController";

const router = Router();

// Retrieve all products
router.get("/", productController.retrieveAllProducts);
// Create product
router.post("/", productController.createProduct);
// Update a product by id
router.put("/:id", productController.updateProductById);
// Delete product by id
router.delete("/:id", productController.deleteProduct);

export default router;
