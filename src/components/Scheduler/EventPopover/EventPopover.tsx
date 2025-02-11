import { EventImpl } from "@fullcalendar/core/internal.js";
import { Popover, Typography } from "@mui/material";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import ClassPopoverContent from "./SubjectEventPopoverContent/SubjectEventPopoverContent";
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
    console.log(eventType, "teste tipo");
    switch (eventType) {
      case "CLASS":
      case "STUDY_TIME":
        return <ClassPopoverContent event={event} />;

      case "TEST":
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
