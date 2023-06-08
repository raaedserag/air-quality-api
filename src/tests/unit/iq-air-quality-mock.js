import { jest } from "@jest/globals";
import { IqAirQualityApi } from "../../libs/iq-airquality/index.js"
import {HttpException} from "../../classes/index.js"


IqAirQualityApi.prototype.getNearestStationAirQuality = jest.fn();

const iqAirQualityApiValidResponse = {
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
};

export function mockGetNearestStationAirQualityValidResponse() {
    IqAirQualityApi.prototype.getNearestStationAirQuality.mockResolvedValueOnce(iqAirQualityApiValidResponse);
}

export function mockGetNearestStationAirQualityNoStationFound() {
    IqAirQualityApi.prototype.getNearestStationAirQuality.mockRejectedValueOnce(new HttpException("Cannot find a near station for the given location", "Cannot find a near station for the given location", 404));
}