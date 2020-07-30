import { loggerTime } from "./logger/loggerTime";
import { loggerLevelEnum, iLogger } from "../types/logger";

export const catchErrorReponse = (error: any, body: iLogger) => {
  const { message, entity, name } = body;
  const { code, errno, sqlMessage, sqlState, sql } = error;
  const errorStatus = {
    code,
    errno,
    sqlMessage,
    sqlState,
    sql,
  };

  loggerTime.done({
    level: loggerLevelEnum.error,
    message,
    entity,
    name,
    description: sqlMessage ? sqlMessage : error.message,
  });

  return {
    code: 400,
    errorMessage: errorStatus,
    data: [],
  };
};
