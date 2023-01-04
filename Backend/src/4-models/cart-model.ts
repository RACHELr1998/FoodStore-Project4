import mongoose from "mongoose";
import { CustomerModel } from "./customer-model";
import { ICartItemModel } from "./cartItem-model";

export interface ICartModel extends mongoose.Document {
  customerId: mongoose.Schema.Types.ObjectId;
  cartProdDate: Date;
  isClosed: boolean;
  cartItems: ICartItemModel;
}

export const CartSchema = new mongoose.Schema<ICartModel>(
  {
    customerId: mongoose.Schema.Types.ObjectId,
    cartProdDate: {
      type: Date,
      required: [true, "Missing date"],
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
    cartItems: {
      type: Array<ICartItemModel>,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

CartSchema.virtual("customer", {
  ref: CustomerModel,
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

export const CartModel = mongoose.model<ICartModel>(
  "CartModel",
  CartSchema,
  "carts"
);
