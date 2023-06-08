import mongoose from 'mongoose';
import AirQuality from "./air-quality.js"
import { dbConnection } from "../utilities/index.js"




beforeAll(async () => {
    await dbConnection.setupTesting();
    await dbConnection.initialize();
});

afterAll(async () => {
    await dbConnection.dropTestingDatabase();
    await dbConnection.close();
});
afterEach(async () => {
    await dbConnection.dropCollections();
});

describe('Test Air Quality Model', function () {
    describe('Test Air Quality record creation', function () {
        it('should record a valid air quality entry', async function () {
            const airQualityValidData = {
                ts: new Date(),
                aqius: 25,
                mainus: "p2",
                aqicn: 10,
                maincn: "p2"
            };
            const airQuality = await AirQuality.create(airQualityValidData);
            expect(airQuality).toHaveProperty("ts");
            expect(airQuality.ts).toBeInstanceOf(Date);

            expect(airQuality).toHaveProperty("aqius");
            expect(typeof airQuality.aqius).toBe("number");

            expect(airQuality).toHaveProperty("mainus");
            expect(typeof airQuality.mainus).toBe("string");

            expect(airQuality).toHaveProperty("aqicn");
            expect(typeof airQuality.aqicn).toBe("number");

            expect(airQuality).toHaveProperty("maincn");
            expect(typeof airQuality.maincn).toBe("string");
        });
        it('should throw an exception when trying to record an air quality entry with a missing required field', async function () {
            const airQualityDataMissingRequiredField = {
                ts: new Date(),
                aqius: 25,
                mainus: "p2",
                aqicn: 10
            };
            await expect(AirQuality.create(airQualityDataMissingRequiredField)).rejects.toThrow(mongoose.Error.ValidationError);
        });
    });
});