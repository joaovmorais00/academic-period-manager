"use client";
import SubjectController from "@/controllers/subject-controller";
import styles from "./styles.module.css";

import AppointmentController from "@/controllers/appointment-controller";
import { SchedulerStudyTimes } from "@/types/Appointment";
import { TableSubject } from "@/types/Subject";
import { ZStudyTimesSchema } from "@/utils/zod/appointment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

interface StudyTimeFormProps {
  successfulCreateEvent?: () => void;
}

export default function SchedulerStudyTimesForm({
  successfulCreateEvent = () => {},
}: StudyTimeFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const [subjects, setSubjects] = useState<TableSubject[]>([]);

  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  useEffect(() => {
    if (session.data?.user.id) handleGetSubjects();
  }, [session]);

  function handleGetSubjects() {
    setLoading(true);
    SubjectController.getAllByUserId(session.data?.user.id ?? "").then(
      (response) => {
        setSubjects(response);
      }
    );
    setLoading(false);
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SchedulerStudyTimes>({
    resolver: zodResolver(ZStudyTimesSchema),
    defaultValues: {
      studyTimes: [
        {
          daysOfWeek: [],
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        },
      ],
      subjectId: "",
    },
  });

  const {
    fields: studyTimesDates,
    append: appendStudyTimes,
    remove: removeStudyTimes,
  } = useFieldArray({
    control,
    name: "studyTimes",
  });

  const onSubmit: SubmitHandler<SchedulerStudyTimes> = ({
    studyTimes,
    subjectId,
  }) => {
    setLoading(true);

    AppointmentController.createManyAppointments(
      studyTimes,
      session.data?.user?.id ?? "",
      subjectId,
      "STUDY_TIME"
    )
      .then(() => {
        reset();
        toast.success("Horário de estudo cadastrado com sucesso");
        successfulCreateEvent();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Houve um erro ao cadastrar horario de estudo");
      });

    setLoading(false);
  };

  const onError = (errors: FieldErrors<SchedulerStudyTimes>) => {
    console.log("Erros de validação:", errors);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Controller
            name={`subjectId`}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="subject">Disciplina</InputLabel>
                <Select
                  {...field}
                  labelId="subject"
                  label="subject"
                  input={<OutlinedInput label="Disciplina" />}
                >
                  {subjects.map(({ id, title }: TableSubject) => (
                    <MenuItem value={id} key={id}>
                      {title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item container xs={12} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-3">
              Horários de estudo
            </Typography>
          </Grid>
          <Grid item container xs={11} rowSpacing={3}>
            {studyTimesDates.map((field, index) => (
              <Grid
                item
                container
                key={field.id}
                xs={12}
                columnSpacing={1}
                rowSpacing={1}
              >
                {studyTimesDates.length > 1 && (
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      aria-label="add"
                      size="large"
                      onClick={() => removeStudyTimes(index)}
                    >
                      <RemoveIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`studyTimes.${index}.startDate`}
                    label="Data de início"
                    error={!!errors.studyTimes?.[index]?.startDate}
                    helperText={errors.studyTimes?.[index]?.startDate?.message}
                    {...register(`studyTimes.${index}.startDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`studyTimes.${index}.endDate`}
                    label="Data de término"
                    error={!!errors.studyTimes?.[index]?.endDate}
                    helperText={errors.studyTimes?.[index]?.endDate?.message}
                    {...register(`studyTimes.${index}.endDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`studyTimes.${index}.startTime`}
                    label="Horário de início"
                    error={!!errors.studyTimes?.[index]?.startTime}
                    helperText={errors.studyTimes?.[index]?.startTime?.message}
                    {...register(`studyTimes.${index}.startTime`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`studyTimes.${index}.endTime`}
                    label="Horário de término"
                    error={!!errors.studyTimes?.[index]?.endTime}
                    helperText={errors.studyTimes?.[index]?.endTime?.message}
                    {...register(`studyTimes.${index}.endTime`)}
                  />
                </Grid>
                <Grid item xs={studyTimesDates.length > 1 ? 3 : 4}>
                  <Controller
                    name={`studyTimes.${index}.daysOfWeek`}
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel id="daysOfWeek">Dias da semana</InputLabel>
                        <Select
                          {...field}
                          labelId="daysOfWeek"
                          label="daysOfWeek"
                          multiple
                          input={<OutlinedInput label="Dias da semana" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {daysOfWeek.map((day: string) => (
                            <MenuItem value={day} key={day}>
                              <Checkbox
                                checked={field?.value?.indexOf(day) > -1}
                              />
                              <ListItemText primary={day} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={1} className={styles.addClassButtonContainer}>
            <IconButton
              color="primary"
              aria-label="add"
              size="large"
              onClick={() =>
                appendStudyTimes({
                  startDate: "",
                  endDate: "",
                  startTime: "",
                  endTime: "",
                  daysOfWeek: [],
                })
              }
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={loading}
      >
        {"Cadastrar"}
      </LoadingButton>
    </Box>
  );
}
