import { Router } from "express";
import Joi from "joi";
import { ApiLogger, RequestValidatorMiddleware } from "../middlewares/index.js"
import { JoiRequestQueryValidator } from "../libs/joi-validator/index.js"
import * as airQualityControllers from "../controllers/air-quality-controllers.js"

const router = Router();
const routerLogger = new ApiLogger("air-quality")

router.use(routerLogger.requestsLoggerMiddleware)

/**
 *  @swagger
 *  /air-quality/by-location:
 *      get:
 *          summary: Get Nearest Station Air Quality
 *          description: Get Nearest Station Air Quality
 *          tags: [Air Quality]
 *          parameters:
 *              - in: query
 *                name: latitude
 *                schema:
 *                  type: number
 *                required: true
 *                description: Location Latitude
 *              - in: query
 *                name: longitude
 *                schema:
 *                  type: number
 *                required: true
 *                description: Location longitude
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  result:
 *                                      type: object
 *                                      properties:
 *                                          pollution:
 *                                              type: object
 *                                              properties:
 *                                                  ts:
 *                                                      type: string
 *                                                      description: Timestamp
 *                                                  aqius:
 *                                                      type: number
 *                                                      description: Air Quality Index US
 *                                                  mainus:
 *                                                      type: string
 *                                                      description: Main Pollutant US
 *                                                  aqicn:
 *                                                      type: number
 *                                                      description: Air Quality Index China
 *                                                  maincn:
 *                                                      type: string
 *                                                      description: Main Pollutant China
 *              400:
 *                  description: Bad Request
 *              500:
 *                  description: Internal Server Error
 */
router.get("/by-location",
    new RequestValidatorMiddleware([
        new JoiRequestQueryValidator(
            Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required()
            }))
    ]),
    airQualityControllers.getNearestStationAirQuality
);

/**
 *  @swagger
 *  /air-quality/max-pollution:
 *      get:
 *          summary: Get Max Pollution
 *          description: Get Max Pollution
 *          tags: [Air Quality]
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  maxPolltionValue:
 *                                      type: number
 *                                      description: Max Pollution Value
 *                                  maxPollutionDateTime:
 *                                      type: string
 *                                      description: Max Pollution Date Time
 */
router.get("/max-pollution", airQualityControllers.getMaxPollution)

router.use(routerLogger.errorsLoggerMiddleware)

export default router;