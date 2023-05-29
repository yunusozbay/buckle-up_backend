"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = require("mongoose");
const tripSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Trip = (0, mongoose_1.model)("Trip", tripSchema);
