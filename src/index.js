import { initializeExpressAPI } from "./routes/express-api.js"
import { Logger, dbConnection } from "./utilities/index.js"

import config from "./configuration.js"

(async function () {
  process
    .on("unhandledRejection", ex => { throw ex })
    .on('SIGTERM', () => process.exit(0))
    .on('SIGINT', () => process.exit(0))

  await dbConnection.initialize()

  const expressApi = initializeExpressAPI()
  const serverLogger = new Logger("server")
  expressApi.listen(config.port, config.host, () => serverLogger.log(`Server started as ${config.environment} on ${config.host}:${config.port}`));
})();
