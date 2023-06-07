import _ from "lodash"
import { AirQualityService } from "../services/index.js"

export async function getNearestStationAirQuality(req, res) {
    const { latitude, longitude } = req.query;
    const airQuality = await AirQualityService.getNearestStationAirQuality(latitude, longitude);
    res.status(200).send({
        result: _.pick(airQuality, "pollution")
    });
}

export async function getMaxPollution(req, res) {
    const maxPollutionEntry = await AirQualityService.getMaxPollutionEntry();
    return res.status(200).send({
        maxPolltionValue: maxPollutionEntry.aqius,
        maxPollutionDateTime: maxPollutionEntry.ts
    });
}