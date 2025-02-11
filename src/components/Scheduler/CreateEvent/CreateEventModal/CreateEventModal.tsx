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
      case "class":
        return "Nova aula";
      case "test":
        return "Nova prova";

      default:
        return "Novo evento";
    }
  };

  const getComponent = () => {
    switch (typeEvent) {
      case "class":
        return (
          <SchedulerClassForm
            successfulCreateEvent={handleSuccessfulCreateEvent}
          />
        );

      case "test":
        return <TestForm successfulCreateEvent={handleSuccessfulCreateEvent} />;

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
