import { EventContentArg } from "@fullcalendar/core/index.js";
import ClassIcon from "@mui/icons-material/Class";
import dayjs from "dayjs";
import styles from "./styles.module.css";
import { useEffect } from "react";

export default function EventContent(eventInfo: EventContentArg) {
  const eventIcon = (typeEvent: string) => {
    switch (typeEvent) {
      case "class":
        return <ClassIcon className={styles.iconSize} />;

      default:
        return <></>;
    }
  };

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
      <div className={styles.iconEvent}>
        {eventIcon(eventInfo.event.extendedProps.eventType)}
      </div>
      <div className={styles.timeEvent}>{` ${dayjs(
        eventInfo.event.start
      ).hour()}:${dayjs(eventInfo.event.start).minute() < 10 ? "0" : ""}${dayjs(
        eventInfo.event.start
      ).minute()} `}</div>
      <div className={styles.titleEvent}>{eventInfo.event.title}</div>
    </div>
  );
}
