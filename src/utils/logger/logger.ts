import { main } from "./loggerConfig";
import { iLogger } from "../../types/logger";

export const logger = ({ level, type, entity, name }: iLogger): void => {
  const message = type;
  main.log({ level, message, entity, name });
};
