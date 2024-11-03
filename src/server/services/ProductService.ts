import { IProduct } from "../models/Product";
import { productRepository } from "../repositories/ProductRepository";
import { SortOrder } from "mongoose";
import logger from "../logger";

export const productService = {
    async retrieveAllProducts(
        sortQuery: string,
        searchString: string
    ): Promise<IProduct[] | undefined> {
        try {
            const sort: { [key: string]: SortOrder } = {}; // default to no sorting
            if (sortQuery) {
                const [key, order] = sortQuery.split(":");
                sort[key] = order === "asc" ? 1 : -1; // MongoDB uses 1 for ascending, -1 for descending
            }
            if (!searchString) {
                return productRepository.retrieveAllProducts(sort);
            }
            return productRepository.retrieveAllProducts(sort, searchString);
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Service error. Something went wrong retrieving products; ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
    },
    async createProduct(
        name: string | undefined,
        description: string | undefined,
        price: number | undefined,
        category: string | undefined,
        stock: number | undefined
    ): Promise<IProduct | undefined> {
        if (!name || !description || !price || !category || !stock) {
            logger.error("Service error. Required params are not provided");
            throw new Error("Service error. Required params are not provided");
        }
        try {
            return await productRepository.createProduct({
                name,
                description,
                price,
                category,
                stock,
            });
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Service error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
    },
    async updateProduct(
        productId: string,
        productData: Partial<IProduct>
    ): Promise<IProduct | undefined | null> {
        try {
            return productRepository.updateProduct(productId, productData);
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Service error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
    },
    async deleteProduct(productId: string): Promise<IProduct | undefined | null> {
        try {
            return productRepository.deleteProduct(productId);
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Service error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
    },
};
