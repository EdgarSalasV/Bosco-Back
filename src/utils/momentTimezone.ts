import moment from "moment-timezone";

export const currentTimestamp = () => {
  const now: moment.Moment = moment(new Date());
  const nowFormatTz: moment.Moment = now.tz("America/Mexico_City");
  const nowFormat: Date = new Date(nowFormatTz.format());
  return nowFormat;
};

export const currentTimestampToNumber = (): number => {
  const now: moment.Moment = moment(new Date());
  const nowFormatTz: moment.Moment = now.tz("America/Mexico_City");

  const year: number = nowFormatTz.year();
  const month: number = nowFormatTz.month() + 1;
  const days: number = nowFormatTz.days();
  const hours: number = nowFormatTz.hours();
  const minutes: number = nowFormatTz.minutes();
  const seconds: number = nowFormatTz.seconds();

  return Number(`${year}${month}${days}${hours}${minutes}${seconds}`);
};
