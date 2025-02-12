import { EventImpl } from "@fullcalendar/core/internal.js";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import style from "./style.module.css";

interface Props {
  event: EventImpl | null;
}

export default function ExtraActivityPopoverContent({ event }: Props) {
  return (
    <>
      <Typography variant="h5">{event?.title}</Typography>
      <Typography sx={{ fontWeight: "bold" }}>{`${dayjs(event?.start)
        .locale("pt-br")
        .format("dddd, D [de] MMMM, HH:mm")} - ${dayjs(event?.end).format(
        "HH:mm"
      )}`}</Typography>

      {event?.extendedProps.infos?.notes && (
        <Typography>Anotações: {event?.extendedProps.infos?.notes}</Typography>
      )}
      {event?.extendedProps.infos?.link && (
        <Typography>
          Link:{" "}
          <a
            className={style.link}
            href={event?.extendedProps.infos?.link}
            target="_blank"
          >
            {event?.extendedProps.infos?.link}
          </a>
        </Typography>
      )}
    </>
  );
}
