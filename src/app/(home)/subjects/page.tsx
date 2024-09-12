"use client";

import TableBox from "@/components/common/Table/TableBox";
import { TableSubject } from "@/types/Subject";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import SubjectController from "@/controllers/subject-controller";

export default function SubjectsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<TableSubject[]>([]);

  function handleGetSubjects() {
    setLoading(true);
    SubjectController.getAll().then((response) => {
      setSubjects(response);
      console.log(response);
    });
    setLoading(false);
  }

  useEffect(() => {
    handleGetSubjects();
  }, []);

  const columns: GridColDef<TableSubject>[] = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "title",
      headerName: "Disciplina",
      width: 300,
    },
    {
      field: "teacher",
      headerName: "Professor(a)",
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
            // setUserToBeEdited(params.id as string);
            // setOpenEditUser(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>,
        <IconButton
          aria-label="delete"
          size="large"
          color="error"
          // onClick={() => handleDeleteUser(params.id as string)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>,
      ],
    },
  ];

  return (
    <Box>
      <Typography variant="h4" className="mb-3">
        Disciplinas
      </Typography>
      <Box marginTop={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/new-subject")}
        >
          Nova Disciplina
        </Button>
      </Box>
      <TableBox>
        <DataGrid
          loading={loading}
          rows={subjects}
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
    </Box>
  );
}
