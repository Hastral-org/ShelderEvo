const { parentPort } = require("worker_threads")
const fs = require("fs")
const path = require("path")
const logDir = "";
parentPort.on("message", (logEntry) => {
    try
    {
        const log = JSON.parse(logEntry)
        const message = `${log.timestamp}[${log.level}] ${log.message}`
        fs.appendFileSync(logDir + log.filename, message + "\n", "utf-8")
    }
    catch(e)
    {
        process.stderr.write(`Failed to write to log: ${e.message}`)
    }
})