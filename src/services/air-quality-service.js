import { IqAirQualityApi } from "../libs/iq-airquality/index.js"
import { Logger } from "../utilities/index.js"
import { AirQuality } from "../models/index.js"


class AirQualityService {
    #iqAirQualityApi;
    #logger;

    constructor() {
        this.#iqAirQualityApi = new IqAirQualityApi();
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
        return await AirQuality.findOne({}).sort({ "aqius": -1 }).limit(1);
    }
}
export default new AirQualityService();