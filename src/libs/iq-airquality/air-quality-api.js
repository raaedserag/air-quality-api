import axios from "axios";
import * as IqAirQualityException from "./api-errors.js"
import { ComponentLogger } from "../../classes/index.js"
import config from "../../configuration.js"

export class IqAirQualityApi {
  #logger;
  constructor(iqAirQualityApiConfig = config.iqAirQualityApiConfig) {
    this.apiKey = iqAirQualityApiConfig.apiKey;
    this.baseUrl = iqAirQualityApiConfig.baseUrl;
  }

  setLogger(logger) {
    if (!(logger instanceof ComponentLogger)) {
      throw new Error("logger must be an instance of ComponentLogger");
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

  async getNearestStationAirQuality(latitude, longitude) {
    const path = "/nearest_city";
    const params = {
      lat: latitude,
      lon: longitude
    };
    try {
      const apiResponse = await this.#callIqAirQualityApi(path, params);
      return apiResponse.data;
    } catch (error) {
      this.#logger.error(error);
      if (error.response.status === 400 && error.response.data.data.message == "city_not_found") {
        throw new IqAirQualityException.NotFoundException();
      }
      throw new IqAirQualityException.IntegrationException(error.message);
    }
  }
}