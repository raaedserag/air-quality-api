import * as airQualityControllers from './air-quality-controllers';
import { AirQualityService } from '../services/index.js';
import { HttpException } from '../classes/index.js';
import sinon from 'sinon';

const airQualityServiceValidResponse = {
    pollution: {
        ts: new Date(),
        aqius: 1,
        mainus: 'p2',
        aqicn: 1,
        maincn: 'p2'
    }
}
describe('Air Quality Controllers', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('getNearestStationAirQuality', () => {
        it('should return 200 with the nearest station air quality', async () => {
            const req = {
                query: {
                    latitude: 1,
                    longitude: 2
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            };
            const assertedResponseStatusCode = 200;
            const assertedResponse = {
                result: airQualityServiceValidResponse
            }
            sinon.stub(AirQualityService, 'getNearestStationAirQuality').resolves(airQualityServiceValidResponse);

            await airQualityControllers.getNearestStationAirQuality(req, res);

            sinon.assert.calledWith(res.status, assertedResponseStatusCode);
            sinon.assert.calledWith(res.send, assertedResponse);
        });

        it('should return 404 when no station is found', async () => {
            const req = {
                query: {
                    latitude: 1,
                    longitude: 2
                }
            };
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            };
            const assertedResponseStatusCode = 404;
            const assertedResponse = "Cannot find a near station for the given location"
            sinon.stub(AirQualityService, 'getNearestStationAirQuality').rejects(new HttpException(assertedResponse, assertedResponse, assertedResponseStatusCode));

            expect(async () => {
                await airQualityControllers.getNearestStationAirQuality(req, res);
            }).rejects.toThrow(HttpException);


        });
    });

    describe('getMaxPollution', () => {
        it('should return 200 with the max pollution entry', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            };
            const assertedResponseStatusCode = 200;
            const assertedResponse = {
                maxPolltionValue: airQualityServiceValidResponse.pollution.aqius,
                maxPollutionDateTime: airQualityServiceValidResponse.pollution.ts
            }
            sinon.stub(AirQualityService, 'getMaxPollutionEntry').resolves(airQualityServiceValidResponse.pollution);

            await airQualityControllers.getMaxPollution(req, res);

            sinon.assert.calledWith(res.status, assertedResponseStatusCode);
            sinon.assert.calledWith(res.send, assertedResponse);
        });

        it('should return 404 when no station is found', async () => {
            const req = {};
            const res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub()
            };
            const assertedResponseStatusCode = 404;
            const assertedResponse = "No air quality data found"
            sinon.stub(AirQualityService, 'getMaxPollutionEntry').rejects(new HttpException(assertedResponse, assertedResponse, assertedResponseStatusCode));

            expect(async () => {
                await airQualityControllers.getMaxPollution(req, res);
            }).rejects.toThrow(HttpException);

        });
    });
});