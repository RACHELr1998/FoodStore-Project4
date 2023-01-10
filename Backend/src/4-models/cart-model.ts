import mongoose from "mongoose";
import { CustomerModel } from "./customer-model";

export interface ICartModel extends mongoose.Document {
  customerId: mongoose.Schema.Types.ObjectId;
  cartProdDate: Date;
  isClosed: boolean;
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
