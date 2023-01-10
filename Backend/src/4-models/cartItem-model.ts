import mongoose from "mongoose";
import { CartModel } from "./cart-model";
import { ProductModel } from "./product-model";

export interface ICartItemModel extends mongoose.Document {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  cartId: mongoose.Schema.Types.ObjectId;
}

export const CartItemSchema = new mongoose.Schema<ICartItemModel>(
  {
    productId: mongoose.Schema.Types.ObjectId,
    quantity: {
      type: Number,
      required: [true, "Missing quantity"],
      min: [1, "Quantity must be minimum 1 numbers"],
      max: [1000, "Quantity can't exceed 1000 numbers"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Missing totalPrice"],
      min: [0, "Total price must be minimum 0 numbers"],
    },
    cartId: mongoose.Schema.Types.ObjectId,
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

CartItemSchema.virtual("product", {
  ref: ProductModel,
  localField: "productId",
  foreignField: "_id",
  justOne: true,
});

CartItemSchema.virtual("cart", {
  ref: CartModel,
  localField: "cartId",
  foreignField: "_id",
  justOne: true,
});

export const CartItemModel = mongoose.model<ICartItemModel>(
  "CartItemModel",
  CartItemSchema,
  "cartItems"
);
