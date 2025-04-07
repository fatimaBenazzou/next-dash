import { Schema, model, models } from "mongoose";

const productSchema = new Schema<ProductI>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: {
            current: { type: Number, required: true },
            original: { type: Number },
        },
        stock: { type: Number, default: 0 },
        image: { type: String },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    },
    {
        timestamps: true,
    }
);

const Product = models["Product"] || model<ProductI>("Product", productSchema);
export default Product;
