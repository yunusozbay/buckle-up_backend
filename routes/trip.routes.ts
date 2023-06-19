import { Router, Request, Response, NextFunction} from "express";
import { Trip } from "../models/Trip.model";
import { User } from "../models/User.model"

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in trip routes");
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);
        res.status(200).json({ trip });
      } catch (error) {
        console.log(error);
      }
});

router.post("/add",async (req:Request, res: Response, next: NextFunction) => {
    const trip = req.body.trip;
    try {
        const newTrip = await Trip.create({
            title: trip.title,
            startingCity: trip.startingCity,
            destination: trip.destination,
            waypoints: trip.waypoints,
            attractions: trip.attractions,
            totalDistance: trip.totalDistance,
            totalTime: trip.totalTime
        })
        const userId = req.body.userData._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { trips: newTrip._id } },
            { new: true }
        ).populate("trips");
        res.status(201).json({ updatedUser });
    } catch (error) {
        console.log(error);
      }
})

router.post("/update", async (req:Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body.updatedTrip)
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.body.updatedTrip._id,
      { ...req.body.updatedTrip },
      { new: true }
    )
    const updatedUser = await User.findById(req.body.userData._id)
    res.status(200).json({ updatedTrip, updatedUser });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const tripId = req.body.tripData._id;
    await Trip.findByIdAndDelete(tripId);
    const updatedUser = await User.findById(req.body.userData._id).populate(
      "trips"
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log(error);
  }
});

export default router;