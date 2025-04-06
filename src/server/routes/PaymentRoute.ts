import { Router } from "express";
import { paymentController } from "../controllers/PaymentController";

const router = Router();

// Create Stripe checkout session
/**
 * @swagger
 * /api/payments/create-checkout-session:
 *   post:
 *     summary: Create a Stripe Checkout session
 *     description: Initiates a new Stripe Checkout session for the provided items and currency.
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currency
 *               - items
 *             properties:
 *               currency:
 *                 type: string
 *                 example: "usd"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - quantity
 *                     - price
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Stylish Sunglasses"
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 199.99
 *     responses:
 *       201:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "cs_test_a1b2c3d4e5f6"
 *                 url:
 *                   type: string
 *                   example: "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6"
 *       400:
 *         description: Bad request due to missing parameters
 *       500:
 *         description: Internal server error
 */
router.post(
    "/create-checkout-session",
    paymentController.createCheckoutSession
);

// Get status of Stripe checkout session
/*
 * @swagger
 * /api/payments/checkout-session-status/{checkoutSessionId}:
 *   get:
 *     summary: Get the status of a Stripe Checkout session
 *     description: Retrieves the status and details of a previously created Stripe Checkout session.
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: checkoutSessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the Stripe Checkout session
 *     responses:
 *       200:
 *         description: Session status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "cs_test_a1b2c3d4e5f6"
 *                 payment_status:
 *                   type: string
 *                   example: "paid"
 *                 customer_email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       400:
 *         description: Invalid session ID
 *       500:
 *         description: Failed to retrieve session details
 */
router.get("/:checkoutSessionId", paymentController.getCheckoutSessionStatus);

export default router;
