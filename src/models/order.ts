import { Schema, model, Document, models } from "mongoose";
import "./product";
import "./user";
export interface OrderD extends Document, BaseOrderI<Schema.Types.ObjectId> {}

const orderSchema = new Schema<OrderD>(
    {
        cart: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Référence à Product
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        delivery: {
            province: { type: Number, required: true },
            city: { type: String, required: true },
            address: { type: String },
            phone: {
                type: String,
                required: true,
                match: [/^(00213|\+213|0)(5|6|7)[0-9]{8}$/, "Not a valid phone number"],
            },
        },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "delivered", "cancelled", "returned"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Order = models.Order || model<OrderD>("Order", orderSchema);

export default Order;
