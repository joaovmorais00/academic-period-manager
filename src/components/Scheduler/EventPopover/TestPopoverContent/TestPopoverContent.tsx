import { EventImpl } from "@fullcalendar/core/internal.js";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

interface Props {
  event: EventImpl | null;
}

export default function TestPopoverContent({ event }: Props) {
  return (
    <>
      <Typography variant="h5">{event?.title}</Typography>
      <Typography sx={{ fontWeight: "bold" }}>{`${dayjs(event?.start)
        .locale("pt-br")
        .format("dddd, D [de] MMMM, HH:mm")} - ${dayjs(event?.end).format(
        "HH:mm"
      )}`}</Typography>
      <Typography>Professor: {event?.extendedProps.infos?.teacher}</Typography>
      {event?.extendedProps.infos?.topic && (
        <Typography>Assunto: {event?.extendedProps.infos?.topic}</Typography>
      )}
      {event?.extendedProps.infos?.notes && (
        <Typography>Anotações: {event?.extendedProps.infos?.notes}</Typography>
      )}
      {event?.extendedProps.infos?.link && (
        <Typography>Link: {event?.extendedProps.infos?.link}</Typography>
      )}
      {event?.extendedProps.infos?.worth && (
        <Typography>
          Valor: {event?.extendedProps.infos?.worth} pontos
        </Typography>
      )}
      {event?.extendedProps.infos?.score && (
        <Typography>Nota: {event?.extendedProps.infos?.score}</Typography>
      )}
    </>
  );
}
