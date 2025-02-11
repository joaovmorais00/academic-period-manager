import { EventImpl } from "@fullcalendar/core/internal.js";
import { Popover, Typography } from "@mui/material";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import ClassPopoverContent from "./ClassPopoverContent/ClassPopoverContent";
import TestPopoverContent from "./TestPopoverContent/TestPopoverContent";
require("dayjs/locale/pt-br");

interface Props {
  event: EventImpl | null;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
}
dayjs.locale("pt-br");

export default function EventPopover({ event, onClose, anchorEl }: Props) {
  const getComponent = (eventType: string) => {
    switch (eventType) {
      case "class":
        return <ClassPopoverContent event={event} />;

      case "test":
        return <TestPopoverContent event={event} />;
      default:
        <></>;
        break;
    }
  };

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
        {getComponent(event?.extendedProps.infos?.eventType)}
      </div>
    </Popover>
  );
}
