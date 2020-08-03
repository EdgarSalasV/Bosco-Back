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
export enum loggerTypeEmum {
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

export interface iLogger {
  level: loggerLevelEnum;
  type: loggerTypeEmum;
  entity: string;
  name: string;
  description?: string;
}
