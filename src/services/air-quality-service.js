import { IqAirQualityApi } from "../libs/iq-airquality/index.js"
import { Logger } from "../utilities/index.js"
import { AirQuality } from "../models/index.js"
import config from "../configuration.js"
import { HttpException } from "../classes/index.js"


class AirQualityService {
    #iqAirQualityApi;
    #logger;

    constructor() {
        this.#iqAirQualityApi = new IqAirQualityApi(config.iqAirQualityApiConfig);
        this.#logger = new Logger("air-quality-service");
        this.#iqAirQualityApi.setLogger(this.#logger);
    }

    async getNearestStationAirQuality(latitude, longitude) {
        const airQuality = await this.#iqAirQualityApi.getNearestStationAirQuality(latitude, longitude);
        return airQuality.current
    }

    async recordAirQuality(airPollution) {
        return await AirQuality.create(airPollution);
    }

    async getMaxPollutionEntry() {
        const maxPollutionEntry = await AirQuality.findOne({}).sort({ "aqius": -1 }).limit(1);
        if (!maxPollutionEntry) {
            throw new HttpException("Empty collection", "No air quality data found", 404);
        }
        return await AirQuality.findOne({}).sort({ "aqius": -1 }).limit(1);
    }
}
export default new AirQualityService();