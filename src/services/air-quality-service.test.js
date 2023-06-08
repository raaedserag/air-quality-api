import airQualityService from "./air-quality-service.js"
import { dbConnection } from "../utilities/index.js"
import { HttpException } from "../classes/index.js"

beforeAll(async () => {
    await dbConnection.initialize();
});

afterAll(async () => {
    await dbConnection.close();
});

describe('Test Air Quality Service', function () {
    describe('Test getNearestStationAirQuality', function () {
        it('should return a valid response when valid geo location point provided', async function () {
            const response = await airQualityService.getNearestStationAirQuality(48.856613, 2.352222);
            expect(response).toHaveProperty("pollution");

            expect(response.pollution).toHaveProperty("ts");
            expect(typeof response.pollution.ts).toBe("string");
            expect(new Date(response.pollution.ts)).not.toBe("Invalid Date");

            expect(response.pollution).toHaveProperty("aqius");
            expect(typeof response.pollution.aqius).toBe("number");

            expect(response.pollution).toHaveProperty("mainus");
            expect(typeof response.pollution.mainus).toBe("string");

            expect(response.pollution).toHaveProperty("aqicn");
            expect(typeof response.pollution.aqicn).toBe("number");
        });
        it('should throw an exception when providing a valid geo location but no near stations found', async function () {
            await expect(airQualityService.getNearestStationAirQuality(1, 1)).rejects.toBeInstanceOf(HttpException);
        });
    });

    describe('Test getMaxPollutionEntry', function () {
        it('should return the max pollution entry', async function () {
            const response = await airQualityService.getMaxPollutionEntry();

            expect(response).toHaveProperty("ts");
            expect(response.ts).toBeInstanceOf(Date);

            expect(response).toHaveProperty("aqius");
            expect(typeof response.aqius).toBe("number");

            expect(response).toHaveProperty("mainus");
            expect(typeof response.mainus).toBe("string");

            expect(response).toHaveProperty("aqicn");
            expect(typeof response.aqicn).toBe("number");


        });
    });
    describe('Test recordAirQuality', function () {
        it('should record a valid air quality entry', async function () {
            const airQuality = {
                ts: new Date(),
                aqius: 1,
                mainus: "p2",
                aqicn: 1,
                maincn: "p2"
            }
            const response = await airQualityService.recordAirQuality(airQuality);
            expect(response).toHaveProperty("ts");
            expect(response.ts).toBeInstanceOf(Date);

            expect(response).toHaveProperty("aqius");
            expect(typeof response.aqius).toBe("number");

            expect(response).toHaveProperty("mainus");
            expect(typeof response.mainus).toBe("string");

            expect(response).toHaveProperty("aqicn");
            expect(typeof response.aqicn).toBe("number");
        });
        it('should throw an exception when providing an invalid air quality entry', async function () {
            const airQuality = {
                ts: "",
                aqius: "invalid_aqius",
                mainus: "invalid_mainus",
                aqicn: 1
            }
            await expect(airQualityService.recordAirQuality(airQuality)).rejects.toBeInstanceOf(Error);
        });
    });
});