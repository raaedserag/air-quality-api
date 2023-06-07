import mongoose from "mongoose"
import { setTimeout } from "timers/promises"
import { ComponentLogger } from "../../classes/index.js"

export class MongooseClientConnection {
    constructor(connection = { uri, options }, dbLogger) {
        this.connectionUri = connection.uri
        this.connectionOptions = connection.options
        if (!(dbLogger instanceof ComponentLogger)) throw new Error("Logger must be an instance of ComponentLogger")
        this.logger = dbLogger
    }

    async initialize() {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connection.on('connected', () => {
                    import("../../models/index.js")
                    this.logger.log(`Connected to Mongo Cluster successfully`)
                    resolve()
                })
                mongoose.connection.on('error', error => this.logger.error(error.message))
                mongoose.connection.on('disconnected', () => this.logger.log(`Disconnected from Mongo Cluster`))
                mongoose.set('strictQuery', true);
                mongoose.connect(`${this.connectionUri}`, this.connectionOptions)


                // Load all models when initializing db

            } catch (error) {
                this.logger.error(`Connection to Mongo Cluster failed: ${error} \n Reconnecting...`);
                await setTimeout(5000);
                resolve(await this.initialize())
            }
        })
    }
}