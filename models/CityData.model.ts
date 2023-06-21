import { Schema, model } from "mongoose";

export interface ICityData {
  name: string;
  description: string;
  image: string;
  _id: string;
}

const cityDataSchema = new Schema<ICityData>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    }
  }
);

export const CityData = model<ICityData>("Trip", cityDataSchema);