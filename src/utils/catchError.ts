import { logger } from "./logger";
import { levelsWinston } from "../types/winston";

// export const catchErrorTypeOrm = (error: any, entity: string) => {
export const catchErrorTypeOrm = (error: any) => {
  const { code, errno, sqlMessage, sqlState, sql } = error;
  const errorStatus = {
    code,
    errno,
    sqlMessage,
    sqlState,
    sql,
  };
  logger.error({
    level: levelsWinston.info,
    message: "CONTROLLER",
    // entity,
    entity: "asdas",
    name: "getCommentList",
  });
  return {
    code: 400,
    errorMessage: errorStatus,
    data: [],
  };
};
