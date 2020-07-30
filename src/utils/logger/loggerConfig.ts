import path from "path";
import { createLogger, format, transports, addColors } from "winston";
import { colorLivels, iLogger } from "../../types/logger";
import { currentTimestamp, currentTimestampToNumber } from "../momentTimezone";

//#region LOGGER CONFIG
const isProduction = process.env.NODE_ENV === "production";
const pathLog = path.resolve("files", "logs");

const { combine, prettyPrint, printf } = format;
// format -> ignorePrivate()
// Messages with { private: true } will not be written when logged.

addColors(colorLivels);
// to functionso OR any methods OR errors .
export const main = createLogger({
  format: formatConfigMain(),
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
export const timeMs = createLogger({
  format: formatConfigTime(),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: `${pathLog}/loggerTime.log`,
      level: "info",
    }),
  ],
  exitOnError: false,
});

// FUNCTIONS

function formatConfigMain() {
  if (isProduction) {
    return combine(
      printf(
        ({ level, message, entity, name }) =>
          `{"level":"${level}","message":"${message}","entity":"${entity}","name":"${name}","created_at":"${currentTimestamp()}","timestamp":"${currentTimestampToNumber()}"}`
      )
    );
  } else {
    return combine(
      format.colorize({ level: true, message: true }),
      prettyPrint(),
      printf(
        ({ level, message, entity, name }) =>
          `{\n"level":"${level}",\n"message":"${message}",\n"entity":"${entity}",\n"name":"${name}",\n"created_at":"${currentTimestamp()}",\n"timestamp":"${currentTimestampToNumber()}"\n}`
      )
    );
  }
}

function formatConfigTime() {
  if (isProduction) {
    return combine(
      printf(
        ({ level, durationMs, message, entity, name }) =>
          `{"level":"${level}","durationMs":"${durationMs}","message":"${message}","entity":"${entity}","name":"${name}","created_at":"${currentTimestamp()}","timestamp":"${currentTimestampToNumber()}"}`
      )
    );
  } else {
    return combine(
      printf(({ level, durationMs, message, entity, name }) => {
        // message = durationMs.toString() + "ms";

        return `{\n"level":"${level}",\n"durationMs":"${durationMs}",\n"message":"${message}",\n"entity":"${entity}",\n"name":"${name}",\n"created_at":"${currentTimestamp()}",\n"timestamp":"${currentTimestampToNumber()}"\n}`;
      })
    );
  }
}
