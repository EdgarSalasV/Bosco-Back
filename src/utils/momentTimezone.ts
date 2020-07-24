import moment from "moment-timezone";

export const currentTimestamp = () => {
  const now: moment.Moment = moment(new Date());
  const nowFormatTz: moment.Moment = now.tz("America/Mexico_City");
  const nowFormat: Date = new Date(nowFormatTz.format());
  return nowFormat;
};
