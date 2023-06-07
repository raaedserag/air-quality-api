import { initializeExpressAPI } from "./routes/express-api.js"

import config from "./configuration.js"

(async function () {
  process
    .on("unhandledRejection", ex => { throw ex })
    .on('SIGTERM', () => process.exit(0))
    .on('SIGINT', () => process.exit(0))

  const expressApi = initializeExpressAPI()
  expressApi.listen(config.port, config.host, () => console.log(`Server started as ${config.environment} on ${config.host}:${config.port}`));
})();
