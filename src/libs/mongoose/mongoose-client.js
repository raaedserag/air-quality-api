import mongoose from "mongoose"
import { setTimeout } from "timers/promises"
import { ComponentLogger } from "../../classes/index.js"

export class MongooseClientConnection {
    #logger;
    #isTesting = false;
    constructor(connection = { uri, options }, dbLogger) {
        this.connectionUri = connection.uri
        this.connectionOptions = connection.options
        if (!(dbLogger instanceof ComponentLogger)) throw new Error("Logger must be an instance of ComponentLogger")
        this.#logger = dbLogger
    }

    async initialize() {
        return new Promise(async (resolve, reject) => {
            try {
                mongoose.connection.on('connected', () => {
                    import("../../models/index.js")
                    this.#logger.log(`Connected to Mongo Cluster successfully`)
                    resolve()
                })
                mongoose.connection.on('error', error => this.#logger.error(error.message))
                mongoose.connection.on('disconnected', () => this.#logger.log(`Disconnected from Mongo Cluster`))
                mongoose.set('strictQuery', true);
                mongoose.connect(`${this.connectionUri}`, this.connectionOptions)

            } catch (error) {
                this.#logger.error(`Connection to Mongo Cluster failed: ${error} \n Reconnecting...`);
                await setTimeout(5000);
                resolve(await this.initialize())
            }
        })
    }
    async close() {
        return new Promise(async (resolve, reject) => {
            try {
                await mongoose.connection.close()
                this.#logger.log(`Disconnected from Mongo Cluster`)
                resolve()
            } catch (error) {
                this.#logger.error(`Disconnection from Mongo Cluster failed: ${error}`)
                reject(error)
            }
        })
    }

    async setupTesting() {
        this.#logger.log(`Preparing testing environment for Mongo Cluster`)
        this.#isTesting = true;
        this.connectionUri = `${this.connectionUri}-testdb`
    }

    async dropTestingDatabase() {
        if (!this.#isTesting) throw new Error("Cannot drop testing database when testing is not enabled")
        this.#logger.log(`Dropping Mongo Cluster in memory for testing`)
        await mongoose.connection.dropDatabase()
    }
    async dropCollections() {
        if (!this.#isTesting) throw new Error("Cannot drop collections when testing is not enabled")
        this.#logger.log(`Dropping Mongo Cluster in memory for testing`)
        const collections = await mongoose.connection.db.collections()
        for (let collection of collections) {
            try {
                await collection.drop()
            } catch (error) {
                if (error.message === "ns not found") return
                if (error.message.includes("a background operation is currently running")) return
                this.#logger.error(error.message)
            }
        }
    }
}