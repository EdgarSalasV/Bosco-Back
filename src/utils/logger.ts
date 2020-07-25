import { createLogger, format, transports, addColors } from "winston";
import { colorLivels } from "../types/winston";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";
const pathLog = path.resolve("files", "logs");

const { combine, timestamp, json, prettyPrint, printf } = format;
// format -> ignorePrivate()
// Messages with { private: true } will not be written when logged.

addColors(colorLivels);
// to functionso OR any methods OR errors .
const logger = createLogger({
  format: formatConfig(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: `${pathLog}/error.log`, level: "error" }),
    new transports.File({
      filename: `${pathLog}/info.log`,
      level: "info",
      maxsize: 50 * 1024,
    }),
    new transports.File({ filename: `${pathLog}/files.log`, level: "files" }),
  ],
  exitOnError: false,
});

// at the start and end of the controller & get timeReponse in MS.
const logerTime = createLogger({
  format: combine(
    format.colorize({ message: true, level: true }),
    timestamp(),
    prettyPrint(),
    printf(({ level, durationMs, message, entity, name, timestamp }) => {
      message = durationMs.toString() + "ms";
      return `{\n "level":"${level}",\n "message":"${message}",\n "entity":"${entity}",\n "name":"${name}",\n "timestamp":"${timestamp}"\n}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${pathLog}/logerTime.log`,
      level: "info",
    }),
  ],
  exitOnError: false,
});

export { logger, logerTime };

// FUNCTIONS
function formatConfig() {
  if (isProduction) {
    return combine(timestamp(), json());
  } else {
    return combine(
      format.colorize({ level: true, message: true }),
      timestamp(),
      prettyPrint(),
      printf(
        ({ level, message, entity, name, timestamp }) =>
          `{\n "level": "${level}",\n "message": "${message}",\n "entity": "${entity}",\n "name": "${name}",\n "timestamp": "${timestamp}"\n}`
      )
    );
  }
}
