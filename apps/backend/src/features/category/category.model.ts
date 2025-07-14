import mongoose, { model, Schema } from "mongoose";
import { ICategory } from "./category.types";

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    description:{ type: String, trim: true },
    parent: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        default:null,
      },
}, {
    timestamps: true,
})


export const CategoryModel = model<ICategory>("Category", categorySchema)