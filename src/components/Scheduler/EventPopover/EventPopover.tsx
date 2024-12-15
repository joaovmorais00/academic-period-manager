import { EventImpl } from "@fullcalendar/core/internal.js";
import { Popover, Typography } from "@mui/material";
import styles from "./styles.module.css";
import dayjs from "dayjs";
require("dayjs/locale/pt-br");

interface Props {
  event: EventImpl | null;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
}
dayjs.locale("pt-br");

export default function EventPopover({ event, onClose, anchorEl }: Props) {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className={styles.eventPopover}>
        <Typography variant="h5">{event?.title}</Typography>
        <Typography>{`${dayjs(event?.start)
          .locale("pt-br")
          .format("dddd, D [de] MMMM, HH:mm")} - ${dayjs(event?.end).format(
          "HH:mm"
        )}`}</Typography>
        <Typography>
          Professor: {event?.extendedProps.infos?.teacher}
        </Typography>
        {event?.extendedProps.infos?.description && (
          <Typography>
            Descrição: {event?.extendedProps.infos?.description}
          </Typography>
        )}
      </div>
    </Popover>
  );
}
