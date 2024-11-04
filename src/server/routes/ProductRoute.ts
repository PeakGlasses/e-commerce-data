import { Router } from "express";
import { productController } from "../controllers/ProductController";

const router = Router();

// Retrieve all products
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieves all products with optional sorting and search functionality.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort products by a field and order. Use "field:asc" or "field:desc".
 *         example: "price:asc"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products based on name, description, or other fields.
 *         example: "sunglasses"
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique product ID
 *                     example: "5f6d7f2e9b1e8b0017f5a1b3"
 *                   name:
 *                     type: string
 *                     description: Name of the product
 *                     example: "Stylish Sunglasses #3"
 *                   description:
 *                     type: string
 *                     description: Detailed description of the product
 *                     example: "A pair of trendy sunglasses with UV protection."
 *                   price:
 *                     type: number
 *                     description: Price of the product
 *                     example: 169.99
 *                   category:
 *                     type: string
 *                     description: Product category
 *                     example: "Accessories"
 *                   stock:
 *                     type: integer
 *                     description: Available stock quantity
 *                     example: 100
 *                   createdAt:
 *                     type: string
 *                     description: The time the product was created
 *                     example: "2024-11-03T22:08:37.238Z"
 *                   updatedAt:
 *                     type: string
 *                     description: The time the product was last updated
 *                     example: "2024-11-03T22:08:37.238Z"
 *       500:
 *         description: Detailed error message
 */
router.get("/", productController.retrieveAllProducts);
// Create product
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the inventory with the specified details.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Stylish Sunglasses"
 *               description:
 *                 type: string
 *                 description: Detailed description of the product
 *                 example: "A pair of trendy sunglasses with UV protection."
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 169.99
 *               category:
 *                 type: string
 *                 description: Category of the product
 *                 example: "Accessories"
 *               stock:
 *                 type: integer
 *                 description: Available stock quantity
 *                 example: 100
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Detailed error message
 */
router.post("/", productController.createProduct);
// Update a product by id
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Updates a product by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique product ID
 *       - in: body
 *         name: product
 *         description: Product information to update
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Updated name of the product
 *                   example: "Updated Stylish Sunglasses"
 *                 description:
 *                   type: string
 *                   description: Updated description of the product
 *                   example: "An updated version of trendy sunglasses with enhanced UV protection."
 *                 price:
 *                   type: number
 *                   description: Updated price of the product
 *                   example: 209.88
 *                 category:
 *                   type: string
 *                   description: Updated product category
 *                   example: "Accessories"
 *                 stock:
 *                   type: integer
 *                   description: Updated stock quantity
 *                   example: 120
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique product ID
 *                   example: "6727f48272a20a7d7cf6107a"
 *                 name:
 *                   type: string
 *                   description: Updated name of the product
 *                   example: "Updated Stylish Sunglasses"
 *                 description:
 *                   type: string
 *                   description: Updated description of the product
 *                   example: "An updated version of trendy sunglasses with enhanced UV protection."
 *                 price:
 *                   type: number
 *                   description: Updated price of the product
 *                   example: 209.88
 *                 category:
 *                   type: string
 *                   description: Updated product category
 *                   example: "Accessories"
 *                 stock:
 *                   type: integer
 *                   description: Updated stock quantity
 *                   example: 120
 *                 createdAt:
 *                   type: string
 *                   description: The time the product was created
 *                   example: "2024-11-03T22:08:37.238Z"
 *                 updatedAt:
 *                   type: string
 *                   description: The time the product was last updated
 *                   example: "2024-11-03T23:08:37.238Z"
 *       500:
 *         description: Detailed error message
 */
router.put("/:id", productController.updateProductById);
// Delete product by id
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Deletes a product from the database by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       500:
 *         description: Detailed error message
 */
router.delete("/:id", productController.deleteProduct);

export default router;
