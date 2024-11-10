export type ReqLineItem = { name: string; price: number; quantity: number };

export type StripeLineItem = {
    price_data: {
        currency: string;
        product_data: { name: string };
        unit_amount: number;
    };
};
