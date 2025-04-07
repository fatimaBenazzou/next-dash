import { model, models, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
        image: { type: String },
        parentCategory: { type: Schema.Types.ObjectId, ref: "Category" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default models["Category"] || model("Category", categorySchema);
