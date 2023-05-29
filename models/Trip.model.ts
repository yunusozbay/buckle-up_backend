import { Schema, model } from "mongoose";

export interface ITrip {
  title: string;
  startingCity: string;
  destination: string;
  waypoints: object[];
  totalDistance: number;
  totalTime: number;
  _id: string;
}

const tripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: [true, "Title is required."]
    },
    startingCity: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true,
    },
    waypoints: {
      type: [Object],
      required: true,
    },
    totalDistance: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Trip = model<ITrip>("Trip", tripSchema);