import express, { Application } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

export const configure = (app: Application): void => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL, "https://buckle-up.netlify.app"],
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
