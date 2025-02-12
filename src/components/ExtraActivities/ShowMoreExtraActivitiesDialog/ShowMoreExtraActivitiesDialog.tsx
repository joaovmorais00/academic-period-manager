"use client";

import ExtraActivityController from "@/controllers/extra-activity-controller";
import { ExtraActivity, ExtraActivityWithId } from "@/types/ExtraActivity";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  open: boolean;
  handleClose: () => void;
  extraActivityId: string;
}

export default function ShowMoreExtraActivitiesDialog({
  open,
  handleClose,
  extraActivityId,
}: Props) {
  const [extraActivity, setExtraActivity] = useState<ExtraActivityWithId>({
    title: "",
    id: "",
    notes: "",
    link: "",
    workSchedules: [],
  });

  useEffect(() => {
    ExtraActivityController.get(extraActivityId)
      .then((response) => setExtraActivity(response))
      .catch((error) => console.log("erro extra", error));
  }, [extraActivityId]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <div className={styles.headerDiv}>
          <div>
            <Typography variant="h4">Atividade Extra</Typography>
          </div>
          <div>
            <IconButton aria-label="delete" size="large" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        {Object.keys(extraActivity).length > 0 && (
          <Grid container rowSpacing={3}>
            <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
              <div>
                <Typography variant="h6">Título:</Typography>
              </div>
              <div>{extraActivity?.title}</div>
            </Grid>

            {extraActivity.notes && (
              <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
                <div>
                  <Typography variant="h6"> Anotações:</Typography>
                </div>
                <div>{extraActivity?.notes}</div>
              </Grid>
            )}

            {extraActivity?.link && (
              <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
                <div>
                  <Typography variant="h6">Link:</Typography>
                </div>
                <a
                  className={styles.link}
                  href={extraActivity?.link}
                  target="_blank"
                >
                  {extraActivity?.link}
                </a>
              </Grid>
            )}

            {extraActivity.workSchedules &&
              extraActivity.workSchedules.length > 0 && (
                <Grid item container>
                  <Grid>
                    <Typography variant="h6">Horários:</Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    sx={{ marginTop: "0.1rem" }}
                    rowSpacing={1}
                  >
                    {extraActivity.workSchedules.map((item) => (
                      <Grid item container xs={12}>
                        <Grid
                          item
                          container
                          xs={3}
                          columnSpacing={1}
                          className={styles.classRow}
                        >
                          <Grid item xs={5}>
                            <Typography variant="subtitle1">Dia:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {item.daysOfWeek[0]}
                          </Grid>
                        </Grid>{" "}
                        <Grid
                          item
                          container
                          xs={5}
                          columnSpacing={1}
                          className={styles.classRow}
                        >
                          <Grid item xs={5}>
                            <Typography variant="subtitle1">
                              Datas de início e término:
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>{`${dayjs(item.startDate).format(
                            "DD-MM-YY"
                          )} à ${dayjs(item.endDate).format(
                            "DD-MM-YY"
                          )}  `}</Grid>
                        </Grid>{" "}
                        <Grid
                          item
                          container
                          xs={3}
                          columnSpacing={1}
                          className={styles.classRow}
                        >
                          <Grid item xs={3}>
                            <Typography variant="subtitle1">
                              Horário:
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={9}
                          >{`${item.startTime} à ${item.endTime}`}</Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
