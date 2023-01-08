import mongoose from "mongoose";
import CityEnum from "./city-enum";
import RoleEnum from "./role-enum";

export interface ICustomerModel extends mongoose.Document {
  firstName: string;
  lastName: string;
  IDCustomer: string;
  username: string;
  password: string;
  city: CityEnum;
  street: string;
  role: RoleEnum;
}

export const CustomerSchema = new mongoose.Schema<ICustomerModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing first name"],
      minlength: [2, "First name must be minimum 2 chars"],
      maxlength: [50, "First name can't exceed 50 chars"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Missing last name"],
      minlength: [2, "Last name must be minimum 2 chars"],
      maxlength: [50, "Last name can't exceed 50 chars"],
      trim: true,
    },
    IDCustomer: {
      type: String,
      required: [true, "Missing ID"],
      minlength: [8, "ID must be minimum 8 numbers"],
      maxlength: [128, "ID can't exceed 128 numbers"],
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Missing username"],
      minlength: [5, "Username must be minimum 5 chars"],
      maxlength: [50, "Username can't exceed 50 chars"],
      trim: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "You have entered an invalid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [4, "Password must be minimum 4 charts"],
      maxlength: [128, "Password can't exceed 1000 charts"],
    },
    city: {
      type: String,
      required: [true, "Missing city"],
      enum: CityEnum,
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
      type: Number,
      required: [true, "Missing role"],
      enum: RoleEnum,
      default: RoleEnum.Customer,
      minlength: [0, "Role can't be negative"],
      maxlength: [1, "Role can't exceed 1"],
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
