"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.css";
import SubjectController from "@/controllers/subject-controller";
import { Subject } from "@/types/Subject";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  handleClose: () => void;
  subjectId: string;
}

export default function ShowMoreSubjectsDialog({
  open,
  handleClose,
  subjectId,
}: Props) {
  const [subject, setSubject] = useState<Subject>({ title: "", teacher: "" });

  useEffect(() => {
    SubjectController.get(subjectId).then((response) => setSubject(response));
  }, [subjectId]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <div className={styles.headerDiv}>
          <div>
            <Typography variant="h4">Disciplina</Typography>
          </div>
          <div>
            <IconButton aria-label="delete" size="large" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        {Object.keys(subject).length > 0 && (
          <Grid container rowSpacing={3}>
            <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
              <div>
                <Typography variant="h6">Título:</Typography>
              </div>
              <div>{subject?.title}</div>
            </Grid>

            <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
              <div>
                <Typography variant="h6"> Professor:</Typography>
              </div>
              <div>{subject?.teacher}</div>
            </Grid>

            {subject?.description && (
              <Grid item xs={12} columnSpacing={1} className={styles.infoRow}>
                <div>
                  <Typography variant="h6">Descrição:</Typography>
                </div>
                <div>{subject?.description}</div>
              </Grid>
            )}

            {subject.classes && subject.classes.length > 0 && (
              <Grid item container>
                <Grid>
                  <Typography variant="h6">Aulas:</Typography>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ marginTop: "0.1rem" }}
                  rowSpacing={1}
                >
                  {subject.classes.map((classItem) => (
                    <Grid item container xs={12}>
                      <Grid
                        item
                        container
                        xs={3}
                        columnSpacing={1}
                        className={styles.classRow}
                      >
                        <Grid item xs={5}>
                          <Typography variant="subtitle1">
                            Dia das aulas:
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {classItem.daysOfWeek[0]}
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
                        <Grid item xs={5}>{`${dayjs(classItem.startDate).format(
                          "DD-MM-YY"
                        )} à ${dayjs(classItem.endDate).format(
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
                          <Typography variant="subtitle1">Horário:</Typography>
                        </Grid>
                        <Grid
                          item
                          xs={9}
                        >{`${classItem.startTime} à ${classItem.endTime}`}</Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            {subject.tests && subject.tests.length > 0 && (
              <Grid item container>
                <Grid>
                  <Typography variant="h6">Provas:</Typography>
                </Grid>
                <Grid
                  item
                  container
                  sx={{ marginTop: "0.1rem" }}
                  rowSpacing={1}
                >
                  {subject.tests.map((test) => (
                    <Grid item container xs={12}>
                      <Grid
                        item
                        xs={3}
                        columnSpacing={1}
                        className={styles.classRow}
                      >
                        <Typography variant="subtitle1">Data:</Typography>
                        &nbsp; {`${test.date}`}
                      </Grid>{" "}
                      <Grid
                        item
                        xs={3}
                        columnSpacing={1}
                        className={styles.classRow}
                      >
                        <Typography variant="subtitle1">Horário:</Typography>
                        &nbsp;{` ${test.startTime} à ${test.endTime}`}
                      </Grid>{" "}
                      {test.worth && (
                        <Grid
                          item
                          xs={3}
                          columnSpacing={1}
                          className={styles.classRow}
                        >
                          <Typography variant="subtitle1">
                            Valor da prova:
                          </Typography>
                          &nbsp;{` ${test.worth}`}
                        </Grid>
                      )}
                      {test.score && (
                        <Grid
                          item
                          xs={3}
                          columnSpacing={1}
                          className={styles.classRow}
                        >
                          <Typography variant="subtitle1">Nota: </Typography>
                          &nbsp;{` ${test.score}`}
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={12}
                        columnSpacing={1}
                        className={styles.classRow}
                      >
                        <Typography variant="subtitle1">Assunto: </Typography>
                        &nbsp;{` ${test.topic}`}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        columnSpacing={1}
                        className={styles.classRow}
                      >
                        <Typography variant="subtitle1">Anotações:</Typography>
                        &nbsp; {` ${test.notes}`}
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
