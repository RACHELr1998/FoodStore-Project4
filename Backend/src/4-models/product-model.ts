import mongoose from "mongoose";
import { CategoryModel } from "./category-model";
import { UploadedFile } from "express-fileupload";

export interface IProductModel extends mongoose.Document {
  categoryId: mongoose.Schema.Types.ObjectId;
  productName: string;
  price: number;
  image: UploadedFile;
  imageName: string;
}

export const ProductSchema = new mongoose.Schema<IProductModel>(
  {
    categoryId: mongoose.Schema.Types.ObjectId,
    productName: {
      type: String,
      required: [true, "Missing product name"],
      minlength: [2, "Product name must be minimum 2 chars"],
      maxlength: [50, "Product name can't exceed 50 chars"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Missing price"],
      min: [0, "Price can't be negative"],
      max: [10000, "Price can't exceed 10,000"],
    },
    image: Object,
    imageName: String,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

ProductSchema.virtual("category", {
  ref: CategoryModel,
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

export const ProductModel = mongoose.model<IProductModel>(
  "ProductModel",
  ProductSchema,
  "products"
);
