import { Request, Response } from "express";
import { productService } from "../services/ProductService";
import logger from "../logger";

export const productController = {
    async retrieveAllProducts(req: Request, res: Response) {
        try {
            const sortQuery = req.query.sort as string;
            const searchString = req.query.search as string;
            const products = await productService.retrieveAllProducts(
                sortQuery,
                searchString
            );
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof Error)
                logger.error(
                    `[retrieveAllProducts] Something went wrong getting all products: ${error.message}`
                );
            return res.status(500).json({ message: "Error fetching products" });
        }
    },
    async createProduct(req: Request, res: Response) {
        try {
            const { name, description, price, category, stock } = req.body;
            if (
                !name ||
                !description ||
                price == null ||
                !category ||
                stock == null
            ) {
                return res
                    .status(400)
                    .json({ message: "Please provide all required fields" });
            }
            const product = await productService.createProduct(
                name,
                description,
                price,
                category,
                stock
            );
            return res
                .status(201)
                .json({ message: "Product created successfully", product });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(
                    `Something went wrong during product creation. ${error.message}`
                );
            }
        }
    },
    async updateProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await productService.updateProduct(
                id,
                productData
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json({
                message: "Product updated successfully",
                updatedProduct,
            });
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Update product error: ${error.message}`);
                return res
                    .status(500)
                    .json({ message: "Error updating product" });
            }
        }
    },
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedProduct = await productService.deleteProduct(id);

            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }

            return res.status(204);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Delete product error: ${error.message}`);
                return res
                    .status(500)
                    .json({ message: "Error deleting product" });
            }
        }
    },
};
