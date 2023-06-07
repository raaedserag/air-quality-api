module.exports = {
    enableDotEnv: false,
    enableConsoleLogs: false,
    mongoConnectionOptions: {
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: "majority"
    },
    airQualityCheckerJobOptions: {
        cronSchedule: "1/5 * * * *", // Every 5 minutes
        cityCoordinates: {
            latitude: 48.856613,
            longitude: 2.352222
        }
    }
}
