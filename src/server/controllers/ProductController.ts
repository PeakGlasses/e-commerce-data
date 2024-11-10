import { Request, Response } from "express";
import { productService } from "../services/ProductService";
import logger from "../logger";
import { EMPTY_STRING } from "../utils/constants";

export const productController = {
    async retrieveAllProducts(req: Request, res: Response) {
        try {
            const sortQuery = req.query.sort as string;
            const searchString = (req.query.search ?? EMPTY_STRING) as string;
            const products = await productService.retrieveAllProducts(
                sortQuery,
                searchString
            );
            return res.status(200).json(products);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message);
                return res.status(500).json({
                    message: `Error fetching products. ${error.message}`,
                });
            }
        }
    },
    async createProduct(req: Request, res: Response) {
        try {
            const { name, description, price, category, stock } = req.body;
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
                const errorMessage = `Something went wrong during product creation. ${error.message}`;
                logger.error(errorMessage);
                res.status(500).json({
                    message: errorMessage,
                });
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

            return res.status(200).json({
                message: "Product updated successfully",
                updatedProduct,
            });
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Error occurred during updating product. ${error.message}`;
                logger.error(errorMessage);
                return res.status(500).json({
                    message: errorMessage,
                });
            }
        }
    },
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id);
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Error deleting product. ${error.message}`;
                logger.error(errorMessage);
                return res.status(500).json({ message: errorMessage });
            }
        }
    },
};
