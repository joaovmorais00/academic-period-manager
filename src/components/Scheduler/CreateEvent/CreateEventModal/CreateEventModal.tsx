import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ClassForm from "../../Classes/ClassForm/ClassForm";
import styles from "./styles.module.css";

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

      default:
        return "Novo evento";
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
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
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
        <div style={{ paddingTop: "1rem" }}>
          {typeEvent === "class" && (
            <ClassForm successfulCreateEvent={handleSuccessfulCreateEvent} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
