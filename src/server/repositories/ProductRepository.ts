import Product, { IProduct } from "../models/Product";

export const productRepository = {
    async retrieveAllProducts(
        sort: any,
        searchString?: string
    ): Promise<IProduct[]> {
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
    },

    async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
        const product = new Product(productData);
        await product.save();
        return product;
    },

    async updateProduct(
        productId: string,
        productData: Partial<IProduct>
    ): Promise<IProduct | null> {
        return Product.findByIdAndUpdate(productId, productData);
    },

    async deleteProduct(productId: string): Promise<IProduct | null> {
        return Product.findByIdAndDelete(productId).exec();
    },
};
