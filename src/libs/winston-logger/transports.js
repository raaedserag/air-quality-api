import { format as winstonFormat, transports as winstonTransports, createLogger } from "winston"
import config from "../../configuration.js"

export class LoggerFileTransport {
    constructor(level, logfileName) {
        this.level = level
        this.logfileName = logfileName
        return new winstonTransports.File({
            filename: `${config.logsConfig.logsPath}/${this.logfileName}.log`, level, options: { flags: 'a' }, format: winstonFormat.combine(winstonFormat.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winstonFormat.json())
        })
    }
}

export class LoggerConsoleTransport {
    constructor(level, loggerName) {
        this.level = level
        this.loggerName = loggerName
        return new winstonTransports.Console({
            level: 'info',
            format: winstonFormat.combine(
                winstonFormat.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winstonFormat.colorize(),
                winstonFormat.printf(logObject => `\x1b[35m[${logObject.timestamp}]\x1b[0m ${logObject.level}\x1b[36m[${this.loggerName}]\x1b[0m: ${logObject.message}`)
            )
        })
    }
}