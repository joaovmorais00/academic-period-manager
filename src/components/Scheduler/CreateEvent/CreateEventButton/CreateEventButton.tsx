import AddIcon from "@mui/icons-material/Add";
import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface Props {
  handleSelectTypeEvent: (typeEvent: string) => void;
}

export default function CreateEventButton({ handleSelectTypeEvent }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenuButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickTypeEvent = (typeEvent: string) => {
    handleClose();
    handleSelectTypeEvent(typeEvent);
  };
  return (
    <>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenuButton}
        startIcon={<AddIcon />}
      >
        Criar evento
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ minWidth: " 10rem" }}
          onClick={() => handleClickTypeEvent("class")}
        >
          Aula
        </MenuItem>
        <MenuItem
          sx={{ minWidth: " 10rem" }}
          onClick={() => handleClickTypeEvent("test")}
        >
          Prova
        </MenuItem>
        <MenuItem sx={{ minWidth: " 10rem" }} onClick={() => {}}>
          Atividade Avaliativa
        </MenuItem>
        <MenuItem sx={{ minWidth: " 10rem" }} onClick={() => {}}>
          Reunião
        </MenuItem>
        <MenuItem sx={{ minWidth: " 10rem" }} onClick={() => {}}>
          Atividade Complementar
        </MenuItem>
        <MenuItem sx={{ minWidth: " 10rem" }} onClick={() => {}}>
          Horário de Estudo
        </MenuItem>
      </Menu>
    </>
  );
}
