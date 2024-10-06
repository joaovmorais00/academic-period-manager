import dayjs from "dayjs";

function createDateTimeString(date: string, time: string) {
  return `${date}t${time}:00`;
}

function DateTimeToStringDate(dateTime: Date) {
  return dayjs(dateTime).format("YYYY-MM-DD");
}

function DateTimeToStringTime(dateTime: Date) {
  return dayjs(dateTime).format("HH:mm");
}

const Dates = {
  createDateTimeString,
  DateTimeToStringDate,
  DateTimeToStringTime,
};
export default Dates;
