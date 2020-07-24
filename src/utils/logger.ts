import { createLogger, format, transports } from "winston";
import path from "path";

const pathLog = path.resolve("files", "logs");
const { combine, timestamp, json } = format;
const formatJson =
  process.env.NODE_ENV === "development" ? json({ space: 1 }) : json();
// format -> ignorePrivate()
// Messages with { private: true } will not be written when logged.

const logger = createLogger({
  format: combine(
    timestamp(),
    formatJson
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `${pathLog}/error.log`, level: "error" }),
    new transports.File({ filename: `${pathLog}/info.log`, level: "info" }),
  ],
  exitOnError: false,
});

export default logger;
