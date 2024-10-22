import { IProduct } from "../models/Product";
import { productRepository } from "../repositories/ProductRepository";

export const productService = {
    async retrieveAllProducts(
        sortQuery: string,
        searchString: string
    ): Promise<IProduct[]> {
        const sort: Record<string, number> = {}; // default to no sorting
        if (sortQuery) {
            const [key, order] = sortQuery.split(":");
            sort[key] = order === "asc" ? 1 : -1; // MongoDB uses 1 for ascending, -1 for descending
        }
        if (!searchString) {
            return productRepository.retrieveAllProducts(sort);
        }
        return productRepository.retrieveAllProducts(sort, searchString);
    },
    async createProduct(
        name: string,
        description: string,
        price: number,
        category: string,
        stock: number
    ): Promise<IProduct> {
        const newProduct = await productRepository.createProduct({
            name,
            description,
            price,
            category,
            stock,
        });
        return newProduct;
    },
    async updateProduct(
        productId: string,
        productData: Partial<IProduct>
    ): Promise<IProduct | null> {
        return productRepository.updateProduct(productId, productData);
    },
    async deleteProduct(productId: string): Promise<IProduct | null> {
        return productRepository.deleteProduct(productId);
    },
};
