"use client";

import TableBox from "@/components/common/Table/TableBox";
import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import ShowMoreExtraActivitiesDialog from "@/components/ExtraActivities/ShowMoreExtraActivitiesDialog/ShowMoreExtraActivitiesDialog";
import ShowMoreSubjectsDialog from "@/components/Subjects/ShowMoreSubjectsDialog/ShowMoreSubjectsDialog";
import ExtraActivityController from "@/controllers/extra-activity-controller";
import { TableExtraActivity } from "@/types/ExtraActivity";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ExtraActivitiesPage() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [extraActivities, setExtraActivities] = useState<TableExtraActivity[]>(
    []
  );
  const [extraActivityToShowId, setExtraActivityToShowId] =
    useState<string>("");
  const [openShowMoreExtraActivity, setOpenShowMoreExtraActivity] =
    useState<boolean>(false);

  useEffect(() => {
    if (session.data?.user.id) handleGetExtraActivities();
  }, [session]);

  function handleCloseShowMoreModal() {
    setOpenShowMoreExtraActivity(false);
    setExtraActivityToShowId("");
  }

  function handleGetExtraActivities() {
    setLoading(true);
    ExtraActivityController.getAllByUserId(session.data?.user.id ?? "").then(
      (response) => {
        setExtraActivities(response);
      }
    );
    setLoading(false);
  }

  function handleDeleteSubject(id: string) {
    setLoading(true);
    ExtraActivityController.remove(id)
      .then(() => {
        toast.success("Atividade extra excluída com sucesso");
        handleGetExtraActivities();
      })
      .catch((error) => {
        toast.error("Não foi possível excluir a atividade extra");
      })
      .finally(() => setLoading(false));
  }

  function handleShowMoreExtraActivity(id: string) {
    setExtraActivityToShowId(id);
    setOpenShowMoreExtraActivity(true);
  }

  const columns: GridColDef<TableExtraActivity>[] = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "title",
      headerName: "Atividade Extra",
      width: 500,
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
            handleShowMoreExtraActivity(`${params.id}`);
          }}
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>,
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() => {
            router.push(`extra-activity/${params.id}`);
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
      <TemplatePage title="Atividades Extra">
        <Box display={"flex"} justifyContent="end" marginBottom={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/new-extra-activity")}
          >
            Nova Atividade Extra
          </Button>
        </Box>
        <TableBox>
          <DataGrid
            loading={loading}
            rows={extraActivities}
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
      <ShowMoreExtraActivitiesDialog
        open={openShowMoreExtraActivity}
        handleClose={handleCloseShowMoreModal}
        extraActivityId={extraActivityToShowId}
      />
    </>
  );
}
