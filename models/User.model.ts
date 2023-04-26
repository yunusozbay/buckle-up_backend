import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: false,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: false,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);


