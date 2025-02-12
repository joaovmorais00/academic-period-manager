import { EventContentArg } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";
import styles from "./styles.module.css";

export default function EventContent(eventInfo: EventContentArg) {
  return (
    <div
      style={{
        backgroundColor: eventInfo.backgroundColor,
        borderRadius: "0.2rem",
        padding: "0.05rem 0.3rem",
        color: eventInfo.textColor,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className={styles.timeEvent}>{` ${dayjs(
        eventInfo.event.start
      ).hour()}:${dayjs(eventInfo.event.start).minute() < 10 ? "0" : ""}${dayjs(
        eventInfo.event.start
      ).minute()} `}</div>
      <div className={styles.titleEvent}>{eventInfo.event.title}</div>
    </div>
  );
}
