import { EventImpl } from "@fullcalendar/core/internal.js";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

interface Props {
  event: EventImpl | null;
}

export default function SubjectEventPopoverContent({ event }: Props) {
  return (
    <>
      <Typography variant="h5">{event?.title}</Typography>
      <Typography sx={{ fontWeight: "bold" }}>{`${dayjs(event?.start)
        .locale("pt-br")
        .format("dddd, D [de] MMMM, HH:mm")} - ${dayjs(event?.end).format(
        "HH:mm"
      )}`}</Typography>
      <Typography>Professor: {event?.extendedProps.infos?.teacher}</Typography>
      {event?.extendedProps.infos?.description && (
        <Typography>
          Descrição: {event?.extendedProps.infos?.description}
        </Typography>
      )}
    </>
  );
}
