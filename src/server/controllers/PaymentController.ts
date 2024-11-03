import { Request, Response } from "express";
import logger from "../logger";
import { paymentService } from "../services/PaymentService";

export const paymentController = {
    async createCheckoutSession(req: Request, res: Response) {
        try {
            const { currency, items } = req.body;
            const checkoutSession = await paymentService.createCheckoutSession(
                currency,
                items
            );
            return res.status(201).json(checkoutSession);
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`${error.message}`);
                switch (error.message) {
                    case "Service error: bad request, one or multiple required parameters are missing.":
                        return res.status(400).json({ message: error.message });
                    default:
                        return res.status(500).json({
                            message: `Failed to create checkout session. ${error.message}`,
                        });
                }
            }
        }
    },
    async getCheckoutSessionStatus(req: Request, res: Response) {
        try {
            const sessionId = req.params.checkoutSessionId;
            const sessionInfo =
                await paymentService.getCheckoutSessionStatus(sessionId);
            res.status(200).json(sessionInfo);
        } catch (error) {
            if (error instanceof Error) {
                switch (error.message) {
                    case "Invalid sessionId or sessionId is required":
                        res.status(400).json({ message: error.message });
                        break;
                    default:
                        res.status(500).json({
                            message: `Something went wrong trying to find your session. ${error.message}`,
                        });
                }
            }
        }
    },
};
