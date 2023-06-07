import expressWinston from "express-winston"
import config from "../../configuration.js"
import {ApiLogger} from "../../classes/index.js"
import { LoggerConsoleTransport, LoggerFileTransport } from "./transports.js"

export class WinstonApiLogger extends ApiLogger {
    constructor(apiName) {
        super()
        this.apiName = apiName
        this.requestsLoggerMiddleware = this.#createApiLoggerMiddleware()
        this.errorsLoggerMiddleware = this.#createApiErrorLoggerMiddleware()
    }
    #createApiLoggerMiddleware() {
        let apiLogerTransports = [
            new LoggerFileTransport("info", `${this.apiName}_API_Requests`)
        ]
        if (config.logsConfig.enableConsoleLogs) apiLogerTransports.push(new LoggerConsoleTransport("info", this.apiName))

        return expressWinston.logger({
            transports: apiLogerTransports,
            msg: "{{req.method}} {{req.url}} => {{res.statusCode} in {{res.responseTime}} ms",
            expressFormat: true,
        })
    }
    #createApiErrorLoggerMiddleware() {
        let apisErrorsTransports = [
            new LoggerFileTransport("error", `${this.apiName}_API_errors`)
        ];

        if (config.logsConfig.enableConsoleLogs) apisErrorsTransports.push(new LoggerConsoleTransport("error", this.apiName))

        return expressWinston.errorLogger({
            transports: apisErrorsTransports,
            msg: "{{err.message}}",
        })
    }
}