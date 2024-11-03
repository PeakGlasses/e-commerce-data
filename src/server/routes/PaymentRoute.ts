import { Router } from "express";
import { paymentController } from "../controllers/PaymentController";

const router = Router();

// Create Stripe checkout session
router.post(
    "/create-checkout-session",
    paymentController.createCheckoutSession
);

// Get status of Stripe checkout session
router.get("/:checkoutSessionId", paymentController.getCheckoutSessionStatus);

export default router;
