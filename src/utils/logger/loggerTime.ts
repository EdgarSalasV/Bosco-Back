import { timeMs } from "./loggerConfig";
import { iLogger } from "../../types/logger";

export const loggerTime = (() => {
  let logTime: any = {};

  return {
    startTimer: () => {
      logTime = timeMs.startTimer();
    },
    done: (body: iLogger) => {
      const { level, message, entity, name } = body;
      logTime.done({
        level,
        message,
        entity,
        name,
      });
    },
  };
})();
