import express, {Express} from "express";

const app: Express = express();

import * as dotenv from 'dotenv'
dotenv.config()

import {configure} from "./config"
configure(app)

import indexRoutes from "./routes/index.routes"
app.use("/", indexRoutes);

import errorHandling from './error-handling';
errorHandling(app);

export default app