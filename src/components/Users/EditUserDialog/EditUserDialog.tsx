"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "../UserForm/UserForm";
import { useEffect, useState } from "react";
import UserController from "@/controllers/user-controller";
import { CompletedUser } from "@/types/User";

interface EditUserDialogProps {
  userToBeEdited: string;
  open: boolean;
  handleClose: () => void;
  handleSuccessfulUpdate: () => void;
}

export default function EditUserDialog({
  userToBeEdited,
  open,
  handleClose,
  handleSuccessfulUpdate,
}: EditUserDialogProps) {
  const [userInfos, setUserInfos] = useState<CompletedUser>({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (userToBeEdited) {
      UserController.get(userToBeEdited).then((response) => {
        if (response) setUserInfos(response);
      });
    }
  }, [userToBeEdited]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          handleClose();
        },
      }}
    >
      <DialogTitle>Editar Usuário</DialogTitle>
      <DialogContent>
        <div>
          <UserForm
            id={userToBeEdited}
            userInfos={userInfos}
            successufulUpdate={handleSuccessfulUpdate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
