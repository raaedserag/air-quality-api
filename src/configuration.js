import config from "config"
import { config as dotEenvConfig } from 'dotenv'

class Configuration {
  constructor(enableDotEnv) {
    if (enableDotEnv) dotEenvConfig()
  }
  get port() {
    return process.env.PORT;
  }
  get host() {
    return process.env.HOST;
  }
  get environment() {
    return process.env.NODE_ENV;
  }
  get version() {
    return process.env.VERSION;
  }
  get logsConfig() {
    return {
      logsPath: process.env.LOGS_PATH,
      enableConsoleLogs: config.get("enable_console_logs")
    }
  }
}

export default new Configuration(config.get("enableDotEnv"));