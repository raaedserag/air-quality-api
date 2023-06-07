// Import Modules
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from "fs";
import express from "express";
import "express-async-errors"
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { errorMiddleware } from "../middlewares/index.js"

import airQualityRoutes from "./air-quality-routes.js";

export function initializeExpressAPI() {
  const app = express();

  // Apply Essential Middlewares
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(cors());


  initializeSwaggerJsdoc(app)

  // Apply Routes
  app.use("/air-quality", airQualityRoutes);

  // Apply Error Middleware
  app.use(errorMiddleware);


  return app
}



function initializeSwaggerJsdoc(app) {
  const swaggerSpec = swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Air Quality API',
        description: 'Air Quality API Docs',
        contact: {
          name: 'Raaed Serag',
          email: 'raaedserag@gmail.com'
        },
      },
      servers: [
        {
          url: `/`,
        }
      ],

    },
    apis: getDirectoryNestedFiles(__dirname),
  })
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Air Quality API"
  }))
}
const getDirectoryNestedFiles = (dirPath) => {
  return fs.readdirSync(dirPath, {
    withFileTypes: true
  }).reduce((files, file) => {
    const name = path.join(dirPath, file.name);
    const isDirectory = file.isDirectory();
    return isDirectory ? [...files, ...getDirectoryNestedFiles(name)] : [...files, name];
  }, []);
}