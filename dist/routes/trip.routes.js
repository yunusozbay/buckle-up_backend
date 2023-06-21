"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Trip_model_1 = require("../models/Trip.model");
const User_model_1 = require("../models/User.model");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.json("All good in trip routes");
});
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripId = req.params.id;
        const trip = yield Trip_model_1.Trip.findById(tripId);
        res.status(200).json({ trip });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/add", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const trip = req.body.trip;
    try {
        const newTrip = yield Trip_model_1.Trip.create({
            title: trip.title,
            startingCity: trip.startingCity,
            destination: trip.destination,
            waypoints: trip.waypoints,
            attractions: trip.attractions,
            totalDistance: trip.totalDistance,
            totalTime: trip.totalTime
        });
        const userId = req.body.userData._id;
        const updatedUser = yield User_model_1.User.findByIdAndUpdate(userId, { $push: { trips: newTrip._id } }, { new: true }).populate("trips");
        res.status(201).json({ updatedUser });
    }
    catch (error) {
        console.log(error);
    }
}));
router.post("/update", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTrip = yield Trip_model_1.Trip.findByIdAndUpdate(req.body.updatedTrip._id, Object.assign({}, req.body.updatedTrip), { new: true });
        const updatedUser = yield User_model_1.User.findById(req.body.userData._id);
        res.status(200).json({ updatedTrip, updatedUser });
    }
    catch (err) {
        console.log("Ohh nooo, error", err);
    }
}));
router.post("/delete", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripId = req.body.tripData._id;
        yield Trip_model_1.Trip.findByIdAndDelete(tripId);
        const updatedUser = yield User_model_1.User.findById(req.body.userData._id).populate("trips");
        res.status(200).json({ updatedUser });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
