import "reflect-metadata";
import { createConnection } from "typeorm";
import { dbOptions } from "./dbOptions";
import { logger } from "../utils/logger/logger";
import { loggerLevelEnum, loggerTypeEmum } from "../types/logger";
import { entityEnum } from "../types/entities";

export const connectionDB = async () => {
  try {
    const connection = await createConnection(dbOptions);
    return connection;
  } catch (error) {
    const { code, errno, sqlMessage, sqlState } = error;
    logger({
      level: loggerLevelEnum.error,
      type: loggerTypeEmum.function,
      entity: entityEnum.none,
      name: "connectionDB()",
    });
    console.error(`Error in DB:
    code:${code}
    errno:${errno}
    sqlMessage:${sqlMessage}
    sqlState:${sqlState}`);
  }
};
