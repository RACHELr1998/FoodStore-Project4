import mongoose from "mongoose";

export interface ICategoryModel extends mongoose.Document {
  categoryName: string;
}

export const CategorySchema = new mongoose.Schema<ICategoryModel>(
  {
    categoryName: {
      type: String,
      required: [true, "Missing category"],
      minlength: [4, "Category must be minimum 4 charts"],
      maxlength: [50, "Category can't exceed 50 charts"],
    },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model<ICategoryModel>(
  "CategoryModel",
  CategorySchema,
  "categories"
);
