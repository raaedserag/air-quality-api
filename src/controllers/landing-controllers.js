import { config } from "../services/index.js"

export function getLandingPage(req, res) {
    return res.status(200).send("Welcome to air quality api");
}

export async function getServerLiveStatus(req, res) {
    return res.status(200).send({
        server: {
            environment: config.environment,
            isOnline: true,
            time: new Date().toISOString(),
            uptime: process.uptime(),
            hrtime: process.hrtime(),
            version: config.version,
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage(),
            platform: process.platform
        }
    });
}
