module.exports = {
    enableDotEnv: false,
    enableConsoleLogs: false,
    mongoConnectionOptions: {
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: "majority"
    }
}
