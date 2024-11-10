import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPayment extends Document {
    orderId: Types.ObjectId; // Reference to the related order
    amount: number; // Payment amount
    currency: string; // Currency of the payment (e.g., 'USD'/'CAD')
    paymentMethod: string; // Payment method (e.g., 'card', 'paypal')
    transactionId: string; // Transaction ID from the payment processor
    status: "pending" | "completed" | "failed" | "refunded";
    receiptUrl?: string; // Link to the receipt from the processor (e.g., Stripe)
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
    {
        orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        transactionId: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        receiptUrl: { type: String },
    },
    { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
