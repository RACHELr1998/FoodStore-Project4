import mongoose from "mongoose";
import { IRoleModel, RoleModel } from "./role-model";

export interface ICustomerModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  IDCustomer: number;
  username: string;
  password: string;
  city: string;
  street: string;
  role: IRoleModel;
}

export const CustomerSchema = new mongoose.Schema<ICustomerModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name must be minimum 2 chars"],
      maxlength: [50, "First name can't exceed 50 chars"],
      trim: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [2, "Last name must be minimum 2 chars"],
      maxlength: [50, "Last name can't exceed 50 chars"],
      trim: true,
      unique: true,
    },
    IDCustomer: {
      type: Number,
      required: [true, "Missing ID"],
      minlength: [8, "ID must be minimum 8 numbers"],
      maxlength: [9, "ID can't exceed 9 numbers"],
    },
    username: {
      type: String,
      required: [true, "Missing username"],
      minlength: [5, "Username must be minimum 5 chars"],
      maxlength: [50, "Username can't exceed 50 chars"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [4, "Password must be minimum 4 charts"],
      maxlength: [50, "Password can't exceed 50 charts"],
      trim: true,
      unique: true,
    },
    city: {
      type: String,
      required: [true, "Missing city"],
      minlength: [2, "City must be minimum 2 charts"],
      maxlength: [100, "City can't exceed 100 charts"],
    },
    street: {
      type: String,
      required: [true, "Missing street"],
      minlength: [2, "Street must be minimum 2 charts"],
      maxlength: [100, "Street can't exceed 100 charts"],
    },
    role: {
      type: RoleModel,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false,
  }
);

// CustomerSchema.virtual("role", {
//   ref: RoleModel,
//   localField: "roleId",
//   foreignField: "_id",
//   justOne: true,
// });

export const CustomerModel = mongoose.model<ICustomerModel>(
  "CustomerModel",
  CustomerSchema,
  "customers"
);
