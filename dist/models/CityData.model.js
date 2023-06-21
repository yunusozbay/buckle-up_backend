"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityData = void 0;
const mongoose_1 = require("mongoose");
const cityDataSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});
exports.CityData = (0, mongoose_1.model)("Trip", cityDataSchema);
