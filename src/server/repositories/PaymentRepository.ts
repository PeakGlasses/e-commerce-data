import Payment, { IPayment } from "../models/Payment";

export const paymentRepository = {
    async createPaymentIntent(): Promise<IPayment[]> {
        // create payment record
        return [];
    },
};
