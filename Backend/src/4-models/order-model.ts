import mongoose from "mongoose";
import { CartModel, ICartModel } from "./cart-model";
import CityEnum from "./city-enum";
import { CustomerModel } from "./customer-model";

export interface IOrderModel extends mongoose.Document {
  customerId: mongoose.Schema.Types.ObjectId;
  cartId: mongoose.Schema.Types.ObjectId;
  finalPrice: number;
  deliveryCity: CityEnum;
  deliveryStreet: string;
  deliveryDate: Date;
  orderDate: Date;
  creditCard: string;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>(
  {
    customerId: mongoose.Schema.Types.ObjectId,
    cartId: mongoose.Schema.Types.ObjectId,
    finalPrice: {
      type: Number,
      required: [true, "Missing final price"],
      min: [0, "Final price must be minimum 0 numbers"],
      max: [10000, "Final price can't exceed 10000 numbers"],
    },
    deliveryCity: {
      type: String,
      required: [true, "Missing delivery-city"],
      minlength: [2, "Delivery-city must be minimum 2 chars"],
      maxlength: [100, "Delivery-city can't exceed 100 chars"],
      enum: CityEnum,
    },
    deliveryStreet: {
      type: String,
      required: [true, "Missing delivery-street"],
      minlength: [2, "Delivery-street must be minimum 2 charts"],
      maxlength: [100, "Delivery-street can't exceed 100 charts"],
      trim: true,
    },
    deliveryDate: {
      type: Date,
      required: [true, "Missing delivery date"],
    },
    orderDate: {
      type: Date,
      required: [true, "Missing order date"],
    },
    creditCard: {
      type: String,
      required: [true, "Missing credit card"],
      trim: true,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

OrderSchema.virtual("customer", {
  ref: CustomerModel,
  localField: "customerId",
  foreignField: "_id",
  justOne: true,
});

OrderSchema.virtual("cart", {
  ref: CartModel,
  localField: "cartId",
  foreignField: "_id",
  justOne: true,
});

export const OrderModel = mongoose.model<IOrderModel>(
  "OrderModel",
  OrderSchema,
  "orders"
);
