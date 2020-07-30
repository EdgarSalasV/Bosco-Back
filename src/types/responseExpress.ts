export enum MessageEnum {
  ok = "ok",
  error = "error",
  warning = "warning",
  added = "data added",
  updated = "data updated",
  deleted = "data deleted",
  noData = "no data",
  noMatch = "data don't match",
}

export interface iResponse {
  code: number;
  message: MessageEnum | string;
  data: any[] | {};
}
