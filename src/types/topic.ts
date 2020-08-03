import { loggerLevelEnum, loggerTypeEmum, iLogger } from "./logger";
import { entityEnum } from "./entities";

export const loggerTimeBody: iLogger = {
  level: loggerLevelEnum.info,
  type: loggerTypeEmum.controller,
  entity: entityEnum.topic,
  name: "",
  description: "",
};
