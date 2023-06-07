import { CronJob, Logger } from "./utilities/index.js"
import { AirQualityService } from "./services/index.js"

export class AirQualityPeriodicChecker extends CronJob {
    constructor(cityCoordinates, cronSchedule) {
        super(`air-quality-periodic-checker`, cronSchedule);

        this.cityCoordinates = cityCoordinates;
        this.logger = new Logger("air-quality-periodic-checker");
    }
    async onTick() {
        const airQuality = await AirQualityService.getNearestStationAirQuality(this.cityCoordinates.latitude, this.cityCoordinates.longitude);
        const airQualityPollution = airQuality.pollution;
        this.logger.log(`Air quality recorded {${airQualityPollution.aqius}}`);
        await AirQualityService.recordAirQuality(airQualityPollution);
    }
}
