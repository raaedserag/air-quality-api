import axios from "axios";
import * as IqAirQualityException from "./api-errors.js"
import { ServiceLogger } from "../../classes/index.js"
import config from "../../configuration.js"

export class IqAirQualityApi {
  #logger;
  constructor() {
    this.apiKey = config.iqAirQualityApiConfig.apiKey;
    this.baseUrl = config.iqAirQualityApiConfig.baseUrl;
  }

  setLogger(logger) {
    if (!(logger instanceof ServiceLogger)) {
      throw new Error("logger must be an instance of ServiceLogger");
    }
    this.#logger = logger;
  }

  async #callIqAirQualityApi(path, params) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.get(url, {
      params: {
        ...params,
        key: this.apiKey
      }
    });
    return response.data;
  }

  async getNearestStationAirQuality(latitute, longitude) {
    const path = "/nearest_city";
    const params = {
      lat: latitute,
      lon: longitude
    };
    try {
      const apiResponse = await this.#callIqAirQualityApi(path, params);
      return apiResponse.data;
    } catch (error) {
      this.#logger.error(error);
      if (error.response.status === 404) {
        throw new IqAirQualityException.NotFoundException();
      }
      else if (error.response.status === 400) {
        throw new IqAirQualityException.BadRequestException(error.response.data.data.message);
      }
      throw new IqAirQualityException.IntegrationException(error.message);
    }
  }
}