import { HttpException } from "../../classes/index.js"

class IqAirQualityException extends HttpException {
    constructor(message, httpCode) {
        super(message, message, httpCode);
        this.name = "IQAirQualityAPIException"
    }
}

export class NotFoundException extends IqAirQualityException {
    constructor() {
        const message = "Cannot find a near station for the given location";
        super(message, 404);
        this.type = "NotFound";
    }
}
export class BadRequestException extends IqAirQualityException {
    constructor(message) {
        super(message, 400);
        this.type = "BadRequest";
    }
}
export class IntegrationException extends IqAirQualityException {
    constructor(message) {
        super(message, 500);
        this.httpMessage = "Internal Server Error";
        this.type = "IntegrationError";
    }
}