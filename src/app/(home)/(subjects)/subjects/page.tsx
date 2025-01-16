"use client";

import { TableSubject } from "@/types/Subject";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import SubjectController from "@/controllers/subject-controller";
import { toast } from "react-toastify";
import TableBox from "@/components/common/Table/TableBox";
import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import { useSession } from "next-auth/react";
import ShowMoreSubjectsDialog from "@/components/Subjects/ShowMoreSubjectsDialog/ShowMoreSubjectsDialog";

export default function SubjectsPage() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<TableSubject[]>([]);
  const [subjectToShowId, setSubjectToShowId] = useState<string>("");
  const [openShowMoreSubject, setOpenShowMoreSubject] =
    useState<boolean>(false);

  useEffect(() => {
    if (session.data?.user.id) handleGetSubjects();
  }, [session]);

  function handleCloseShowMoreModal() {
    setOpenShowMoreSubject(false);
    setSubjectToShowId("");
  }

  function handleGetSubjects() {
    setLoading(true);
    SubjectController.getAllByUserId(session.data?.user.id ?? "").then(
      (response) => {
        setSubjects(response);
      }
    );
    setLoading(false);
  }

  function handleDeleteSubject(id: string) {
    setLoading(true);
    SubjectController.remove(id)
      .then(() => {
        toast.success("Disciplina excluída com sucesso");
        handleGetSubjects();
      })
      .catch((error) => {
        toast.error("Não foi possível excluir a disciplina");
      })
      .finally(() => setLoading(false));
  }

  function handleShowMoreSubject(id: string) {
    setSubjectToShowId(id);
    setOpenShowMoreSubject(true);
  }

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
            handleShowMoreSubject(`${params.id}`);
          }}
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>,
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            router.push(`subject/${params.id}`);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>,
        <IconButton
          aria-label="delete"
          size="large"
          color="error"
          onClick={() => handleDeleteSubject(params.id as string)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>,
      ],
    },
  ];

  return (
    <>
      <TemplatePage title="Disciplinas">
        <Box display={"flex"} justifyContent="end" marginBottom={3}>
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
      </TemplatePage>
      <ShowMoreSubjectsDialog
        open={openShowMoreSubject}
        handleClose={handleCloseShowMoreModal}
        subjectId={subjectToShowId}
      />
    </>
  );
}
