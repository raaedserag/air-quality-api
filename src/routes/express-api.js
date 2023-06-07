// Import Modules
import express from "express";
import "express-async-errors"
import cors from "cors";
import { errorMiddleware } from "../middlewares/index.js"

import airQualityRoutes from "./air-quality-routes.js";

export function initializeExpressAPI() {
  const app = express();

  // Apply Essential Middlewares
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cors());

  // Apply Routes
  app.use("/air-quality", airQualityRoutes);

  // Apply Error Middleware
  app.use(errorMiddleware);


  return app
}
