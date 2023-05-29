import { Router, Request, Response, NextFunction} from "express";
import { Trip } from "../models/Trip.model";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json("All good in trip routes");
});

router.post("/add",async (req:Request, res: Response, next: NextFunction) => {
    const trip = req.body.trip;
    try {
        const newTrip = await Trip.create({
            title: trip.title,
            startingCity: trip.startingCity,
            destination: trip.destination,
            waypoints: trip.waypoints,
            totalDistance: trip.totalDistance,
            totalTime: trip.totalTime
        })
        res.status(201).json({newTrip});
    } catch (error) {
        console.log(error);
      }
})

export default router;