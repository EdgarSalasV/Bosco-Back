import { main } from "./loggerConfig";
import { iLogger } from "../../types/logger";

export const logger = ({ level, message, entity, name }: iLogger): void => {
  main.log({ level, message, entity, name });
};
