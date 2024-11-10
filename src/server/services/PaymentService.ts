import Stripe from "stripe";
import logger from "../logger";
import dotenv from "dotenv";
import { ReqLineItem, StripeLineItem } from "../utils/types";
import { changePriceToCents } from "../utils/utils";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export const paymentService = {
    async createCheckoutSession(
        currency: string | undefined,
        items: ReqLineItem[] | undefined
    ) {
        if (!currency || !items || !items.length) {
            throw new Error(
                "Service error: bad request, one or multiple required parameters are missing."
            );
        }
        try {
            const lineItems: StripeLineItem[] = items.map((item) => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price,
                },
                quantity: item.quantity,
            }));
            const checkoutSession = await stripe.checkout.sessions.create({
                shipping_address_collection: {
                    allowed_countries: ["CA"],
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: "fixed_amount",
                            fixed_amount: {
                                amount: changePriceToCents(5),
                                currency: "cad",
                            },
                            display_name: "Standard shipping",
                            tax_behavior: 'exclusive',
                            tax_code: 'txcd_92010001',
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: 1,
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: 3,
                                },
                            },
                        },
                    },
                    {
                        shipping_rate_data: {
                            type: "fixed_amount",
                            fixed_amount: {
                                amount: changePriceToCents(15),
                                currency: "cad",
                            },
                            display_name: "Next day delivery",
                            tax_behavior: 'exclusive',
                            tax_code: 'txcd_92010001',
                            delivery_estimate: {
                                minimum: {
                                    unit: "business_day",
                                    value: 1,
                                },
                                maximum: {
                                    unit: "business_day",
                                    value: 1,
                                },
                            },
                        },
                    },
                ],
                line_items: lineItems,
                automatic_tax: {
                    enabled: true,
                },
                mode: "payment",
                ui_mode: "embedded",
                return_url:
                    "http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}",
            });
            return {
                clientSecret: checkoutSession.client_secret,
            };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(
                    `Stripe create checkout session error: ${error.message}`
                );
                throw new Error(`Service error: ${error.message}`);
            }
        }
    },
    async getCheckoutSessionStatus(sessionId: string) {
        if (!sessionId) {
            throw new Error(
                "Service error: Invalid sessionId or sessionId is required"
            );
        }
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            return {
                status: session.status,
                payment_status: session.payment_status,
                customer_email: session.customer_details?.email,
            };
        } catch (error) {
            if (error instanceof Error) {
                logger.error(
                    `Service error: Something went wrong downstream. ${error.message}`
                );
                throw new Error(`Service error: ${error.message}`);
            }
        }
    },
};
