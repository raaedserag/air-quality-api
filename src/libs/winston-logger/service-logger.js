import { createLogger } from "winston"
import config from "../../configuration.js"
import {ComponentLogger} from "../../classes/index.js"
import { LoggerConsoleTransport, LoggerFileTransport } from "./transports.js"

export class WinstonComponentLogger extends ComponentLogger {
  #logger;
  constructor(loggerName) {
    super()
    this.loggerName = loggerName;
    this.#logger = this.#initializeLogger()
  }
  log(message) {
    this.#logger.log("info", message)
  }
  error(message) {
    this.#logger.log("error", message)
  }

  #initializeLogger() {
    let serverTransports = [
      new LoggerFileTransport("info", `${this.loggerName}_logs`),
      new LoggerFileTransport("error", `${this.loggerName}_errors`),
    ]
    if (config.logsConfig.enableConsoleLogs) serverTransports.push(new LoggerConsoleTransport("info", this.loggerName))

    return createLogger({
      level: 'info',
      transports: serverTransports
    })
  }
}
