"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function dbConnection() {
    mongoose_1.default.set('strictQuery', false);
    const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buckle-up_backend';
    mongoose_1.default
        .connect(MONGO_URI)
        .then((x) => {
        const dbName = x.connections[0].name;
        console.log(`Connected to Mongo! Database name: "${dbName}"`);
    })
        .catch((err) => {
        console.error('Error connecting to mongo: ', err);
    });
}
exports.default = dbConnection;
