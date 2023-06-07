// Import Modules
import express from "express";
import "express-async-errors"
import cors from "cors";
import * as landingControllers from "../controllers/landing-controllers.js"
import { errorMiddleware } from "../middlewares/index.js"

export function initializeExpressAPI() {
  const app = express();
  
  // Apply Essential Middlewares
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cors());


  app.get("/", landingControllers.getLandingPage);
  app.get("/live", landingControllers.getServerLiveStatus);

  // Apply Error Middleware
  app.use(errorMiddleware);


  return app
}
