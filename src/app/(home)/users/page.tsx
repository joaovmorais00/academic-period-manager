"use client";

import EditUserDialog from "@/components/Users/EditUserDialog/EditUserDialog";
import TableBox from "@/components/common/Table/TableBox";
import UserController from "@/controllers/user-controller";
import { TableUser } from "@/types/User";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Users() {
  const columns: GridColDef<TableUser>[] = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "name",
      headerName: "Nome",
      width: 300,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 150,
      type: "actions",
      getActions: (params: GridRowParams) => [
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            setUserToBeEdited(params.id as string);
            setOpenEditUser(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>,
        <IconButton
          aria-label="delete"
          size="large"
          color="error"
          onClick={() => handleDeleteUser(params.id as string)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>,
      ],
    },
  ];
  const [users, setUsers] = useState<TableUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const [userToBeEdited, setUserToBeEdited] = useState<string>("");

  function handleGetUsers() {
    setLoading(true);
    UserController.getAllUsers().then((response) => {
      const result: TableUser[] = response.map((user) => {
        const { id, name, email } = user;
        return { id, name, email };
      });
      setUsers(result);
      console.log(response, users);
    });
    setLoading(false);
  }

  function handleCloseDialog() {
    setOpenEditUser(false);
    setUserToBeEdited("");
  }

  function handleSuccessfulUpdate() {
    handleGetUsers();
    handleCloseDialog();
  }

  function handleDeleteUser(idUser: string) {
    console.log(idUser, "chegou");
    setLoading(true);
    UserController.deleteUser(idUser)
      .then(() => {
        toast.success("Usuário excluído com sucesso");
        handleGetUsers();
      })
      .catch((error) => {
        console.log(error, "erro ao deletar");
        toast.error("Não foi possível excluir o usuário");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  return (
    <Box>
      <Typography variant="h4" className="mb-3">
        Usuários
      </Typography>
      <TableBox>
        <DataGrid
          loading={loading}
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </TableBox>
      <EditUserDialog
        userToBeEdited={userToBeEdited}
        open={openEditUser}
        handleClose={handleCloseDialog}
        handleSuccessfulUpdate={handleSuccessfulUpdate}
      />
    </Box>
  );
}
