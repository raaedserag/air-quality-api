import { Logger } from "../utilities/index.js"
import { MongooseClientConnection } from "../libs/mongoose/mongoose-client.js"
import config from "../configuration.js"


export default new MongooseClientConnection({ uri: config.mongoDbConfig.uri, options: config.mongoDbConfig.options }, new Logger("Mongoose"))