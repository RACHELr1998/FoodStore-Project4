import mongoose from "mongoose";

export interface ICredentialsModel extends mongoose.Document {
  username: string;
  password: string;
}

export const CredentialsSchema = new mongoose.Schema<ICredentialsModel>(
  {
    username: {
      type: String,
      required: [true, "Missing username"],
      minlength: [5, "Username must be minimum 5 chars"],
      maxlength: [50, "Username can't exceed 50 chars"],
      trim: true,
      unique: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "You have entered an invalid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minlength: [4, "Password must be minimum 4 charts"],
      maxlength: [128, "Password can't exceed 128 charts"],
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

export const CredentialsModel = mongoose.model<ICredentialsModel>(
  "CredentialsModel",
  CredentialsSchema,
  "customers"
);
