import SubjectForm from "@/components/Subjects/SubjectForm/SubjectForm";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";

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
          const email = formJson.email;
        },
      }}
    >
      <DialogTitle>{title()}</DialogTitle>
      <DialogContent>
        <div style={{ paddingTop: "1rem" }}>
          {typeEvent === "class" && (
            <SubjectForm successfulCreateEvent={handleSuccessfulCreateEvent} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
