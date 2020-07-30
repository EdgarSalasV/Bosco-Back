export enum loggerLevelEnum {
  error = "error",
  warn = "warn",
  info = "info",
  http = "http",
  verbose = "verbose",
  debug = "debug",
  silly = "silly",
  files = "files",
}
//TODO INFO remember property "message" is the type of Action
export enum loggerMessageEmum {
  controller = "CONTROLLER",
  function = "FUNCTION",
  method = "METHOD",
}

export const colorLivels = {
  error: "red",
  warn: "yellow",
  info: "magenta",
  files: "green",
};

//TODO INFO remember property "message" is the type of Action
export interface iLogger {
  level: loggerLevelEnum;
  message: string;
  entity: string;
  name: string;
  description?: string;
}
