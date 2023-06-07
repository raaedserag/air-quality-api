import { IqAirQualityApi } from "../libs/iq-airquality/index.js"
import { Logger } from "../utilities/index.js"


class AirQualityService {
    #iqAirQualityApi;
    #logger;

    constructor() {
        this.#iqAirQualityApi = new IqAirQualityApi();
        this.#logger = new Logger("air-quality-service");
        this.#iqAirQualityApi.setLogger(this.#logger);
    }

    async getNearestStationAirQuality(latitute, longitude) {
        const airQuality = await this.#iqAirQualityApi.getNearestStationAirQuality(latitute, longitude);
        return airQuality.current;
    }
}
export default new AirQualityService();