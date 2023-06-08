import {jest} from "@jest/globals";
import axios from "axios";
import { IqAirQualityApi } from "./air-quality-api.js";
import * as AirQualityApiErrors from "./api-errors.js"
import { Logger } from "../../utilities/index.js"

jest.mock('axios');
axios.get = jest.fn();

const iqAirQualityApiValidResponse = {
    data: {
        "status": "ok",
        "data": {
            "city": "Paris",
            "state": "Ile-de-France",
            "country": "France",
            "location": {
                "type": "Point",
                "coordinates": [
                    2.352222,
                    48.856613
                ]
            },
            "current": {
                "weather": {
                    "ts": "2021-03-21T15:00:00.000Z",
                    "tp": 12,
                    "pr": 1016,
                    "hu": 76,
                    "ws": 2.06,
                    "wd": 250,
                    "ic": "04d"
                },
                "pollution": {
                    "ts": "2021-03-21T15:00:00.000Z",
                    "aqius": 51,
                    "mainus": "p2",
                    "aqicn": 19,
                    "maincn": "p2"
                }
            }
        }
    }
};
const iqAirQualityApiCityNotFoundResponse = {
    response: {
        status: 400,
        data: {
            data: {
                message: "city_not_found"
            }
        }
    }
}
const iqAirQualityApiInvalidKeyResponse = {
    response: {
        status: 401,
        data: {
            data: {
                message: "invalid_key"
            }
        }
    }
}


describe('Test IQ Air Quality API Integrations', function () {
    const iqAirQualityApi = new IqAirQualityApi();
    iqAirQualityApi.setLogger(new Logger("IqAirQualityApi"));

    describe('Test getNearestStationAirQuality', function () {
        it('should return a valid response when valid geo location point provided', async function () {
            await axios.get.mockResolvedValue(iqAirQualityApiValidResponse);

            const response = await iqAirQualityApi.getNearestStationAirQuality(48.856613, 2.352222);
            expect(response).toHaveProperty("current");
            expect(response.current).toHaveProperty("pollution");

            expect(response.current.pollution).toHaveProperty("ts");
            expect(typeof response.current.pollution.ts).toBe("string");
            expect(new Date(response.current.pollution.ts)).not.toBe("Invalid Date");

            expect(response.current.pollution).toHaveProperty("aqius");
            expect(typeof response.current.pollution.aqius).toBe("number");

            expect(response.current.pollution).toHaveProperty("mainus");
            expect(typeof response.current.pollution.mainus).toBe("string");

            expect(response.current.pollution).toHaveProperty("aqicn");
            expect(typeof response.current.pollution.aqicn).toBe("number");


            expect(response.current.pollution).toHaveProperty("maincn");
            expect(typeof response.current.pollution.maincn).toBe("string");

        });
        it('should throw a NotFoundException when providing a valid geo location but no near stations found', async function () {
            axios.get.mockRejectedValue(iqAirQualityApiCityNotFoundResponse);
            await expect(iqAirQualityApi.getNearestStationAirQuality(1, 1)).rejects.toBeInstanceOf(AirQualityApiErrors.NotFoundException);
        });
        it('should throw a IntegrationException when providing an invalid key', async function () {
            axios.get.mockRejectedValue(iqAirQualityApiInvalidKeyResponse);
            await expect(iqAirQualityApi.getNearestStationAirQuality("a", "cccc")).rejects.toBeInstanceOf(AirQualityApiErrors.IntegrationException);
        });
    });
});
