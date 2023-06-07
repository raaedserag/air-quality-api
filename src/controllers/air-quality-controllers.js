import _ from "lodash"
import { AirQualityService } from "../services/index.js"

export async function getNearestStationAirQuality(req, res) {
    const { latitude, longitude } = req.query;
    const airQuality = await AirQualityService.getNearestStationAirQuality(latitude, longitude);
    res.status(200).send({
        result: _.pick(airQuality, "pollution")
    });
}