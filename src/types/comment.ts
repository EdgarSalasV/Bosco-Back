import { loggerLevelEnum, loggerTypeEmum, iLogger } from "./logger";
import { entityEnum } from "./entities";

const loggerTimeBody: iLogger = {
  level: loggerLevelEnum.info,
  type: loggerTypeEmum.controller,
  entity: entityEnum.comment,
  name: "",
  description: "",
};
