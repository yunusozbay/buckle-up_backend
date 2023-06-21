import express, {Express} from "express";

const app: Express = express();

import * as dotenv from 'dotenv'
dotenv.config()

import {configure} from "./config"
configure(app)

import indexRoutes from "./routes/index.routes"
app.use("/", indexRoutes);

import authRoutes from "./routes/auth.routes"
app.use("/auth", authRoutes);

import tripRoutes from "./routes/trip.routes"
app.use("/trip", tripRoutes);

import cityRoutes from "./routes/city.routes"
app.use("/city", cityRoutes);

import errorHandling from './error-handling';
errorHandling(app);


//Database connection
import db from "./db"
db()

export default app