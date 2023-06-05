import config from "config"
import { config as dotEenvConfig } from 'dotenv'

class Configuration {
  constructor() {
    this.enableDotEnv = config.get("enableDotEnv")
    if (this.enableDotEnv) dotEenvConfig()
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
}

export default new Configuration();