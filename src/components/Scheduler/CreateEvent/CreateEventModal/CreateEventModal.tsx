import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import SchedulerClassForm from "../../Classes/SchedulerClassForm/SchedulerClassForm";
import styles from "./styles.module.css";
import TestForm from "../../SchedulerTests/TestsForm/TestsForm";
import SchedulerStudyTimesForm from "../../SchedulerStudyTimes/SchedulerStudyTimesForm/SchedulerStudyTimesForm";
import ExtraActivityForm from "@/components/ExtraActivities/ExtraActivityForm/ExtraActivityForm";

interface Props {
  open: boolean;
  handleClose: (createdEvent: boolean) => void;
  typeEvent: string;
}

export default function CreateEventModal({
  open,
  handleClose,
  typeEvent,
}: Props) {
  const handleSuccessfulCreateEvent = () => {
    handleClose(true);
  };

  const title = () => {
    switch (typeEvent) {
      case "CLASS":
        return "Nova aula";
      case "TEST":
        return "Nova atividade avaliativa";
      case "STUDY_TIME":
        return "Nova horário de estudo";
      case "EXTRA":
        return "Nova atividade extra";
      default:
        return "Novo evento";
    }
  };

  const getComponent = () => {
    switch (typeEvent) {
      case "CLASS":
        return (
          <SchedulerClassForm
            successfulCreateEvent={handleSuccessfulCreateEvent}
          />
        );

      case "TEST":
        return <TestForm successfulCreateEvent={handleSuccessfulCreateEvent} />;
      case "STUDY_TIME":
        return (
          <SchedulerStudyTimesForm
            successfulCreateEvent={handleSuccessfulCreateEvent}
          />
        );
      case "EXTRA":
        return (
          <ExtraActivityForm
            successfulCreateEvent={handleSuccessfulCreateEvent}
          />
        );
      default:
        <></>;
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xl"
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
        },
      }}
    >
      <DialogTitle>
        <div className={styles.headerDiv}>
          <div>
            <Typography variant="h4">{title()}</Typography>
          </div>
          <div>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleClose(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ paddingTop: "1rem" }}>{getComponent()}</div>
      </DialogContent>
    </Dialog>
  );
}
