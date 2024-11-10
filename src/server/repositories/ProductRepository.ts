import Product, { IProduct } from "../models/Product";
import { SortOrder } from "mongoose";
import logger from "../logger";

export const productRepository = {
    async retrieveAllProducts(
        sort: { [key: string]: SortOrder },
        searchString?: string
    ): Promise<IProduct[] | undefined> {
        try {
            if (!searchString) {
                return Product.find().sort(sort).exec();
            }
            const searchRegex = new RegExp(searchString, "i");

            return await Product.find({
                $or: [
                    { name: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } },
                    { category: { $regex: searchRegex } },
                ],
            }).exec();
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Repository error. Something went wrong retrieving products from MongoDB; ${error.message}`;
                logger.error(errorMessage)
                throw new Error(errorMessage)
            }
        }
    },

    async createProduct(productData: Partial<IProduct>): Promise<IProduct | undefined> {
        try {
            const product = new Product(productData);
            await product.save();
            return product;
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Repository error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage)
            }
        }
    },

    async updateProduct(
        productId: string,
        productData: Partial<IProduct>
    ): Promise<IProduct | null | undefined> {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, productData);
            if (!updatedProduct) {
                throw new Error("Repository error. Product not found");
            }
            return updatedProduct
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Repository error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage)
            }
        }
    },

    async deleteProduct(productId: string): Promise<IProduct | undefined | null> {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId).exec();
            if (!deletedProduct) {
                throw new Error("Repository error. Product not found");
            }
            return deletedProduct
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = `Repository error. ${error.message}`;
                logger.error(errorMessage);
                throw new Error(errorMessage)
            }
        }
    },
};
