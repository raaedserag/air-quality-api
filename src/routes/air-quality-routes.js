import { Router } from "express";
import Joi from "joi";
import { ApiLogger, RequestValidatorMiddleware } from "../middlewares/index.js"
import { JoiRequestQueryValidator } from "../libs/joi-validator/index.js"
import * as airQualityControllers from "../controllers/air-quality-controllers.js"

const router = Router();
const routerLogger = new ApiLogger("air-quality")

router.use(routerLogger.requestsLoggerMiddleware)

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

router.get("/max-pollution", airQualityControllers.getMaxPollution)

router.use(routerLogger.errorsLoggerMiddleware)

export default router;