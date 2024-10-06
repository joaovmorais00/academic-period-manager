import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const defaultTimezone = "America/Sao_Paulo";

export const createDateInDefaultTimezone = (date: string) => {
  return dayjs(date).tz(defaultTimezone);
};
