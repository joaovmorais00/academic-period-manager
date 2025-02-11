"use client";
import SubjectController from "@/controllers/subject-controller";
import styles from "./styles.module.css";

import { Appointment, SchedulerClasses } from "@/types/Appointment";
import { ZSchedulerClassSchema } from "@/utils/zod/appointment-schema";
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
import { TableSubject } from "@/types/Subject";
import AppointmentController from "@/controllers/appointment-controller";

interface ClassFormProps {
  successfulCreateEvent?: () => void;
}

export default function SchedulerClassForm({
  successfulCreateEvent = () => {},
}: ClassFormProps) {
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
    getFieldState,
  } = useForm<SchedulerClasses>({
    resolver: zodResolver(ZSchedulerClassSchema),
    defaultValues: {
      classes: [
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
    fields: classesDates,
    append: appendClassesDates,
    remove: removeClassesDates,
  } = useFieldArray({
    control,
    name: "classes",
  });

  const onSubmit: SubmitHandler<SchedulerClasses> = ({
    classes,
    subjectId,
  }) => {
    setLoading(true);

    AppointmentController.createManyClasses(
      classes,
      session.data?.user?.id ?? "",
      subjectId
    )
      .then(() => {
        reset();
        toast.success("Aula cadastrada com sucesso");
        successfulCreateEvent();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Houve um erro ao cadastrar a aula");
      });

    setLoading(false);
  };

  const onError = (errors: FieldErrors<SchedulerClasses>) => {
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
              Aulas
            </Typography>
          </Grid>
          <Grid item container xs={11} rowSpacing={1}>
            {classesDates.map((field, index) => (
              <Grid item container key={field.id} xs={12} columnSpacing={1}>
                {classesDates.length > 1 && (
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      aria-label="add"
                      size="large"
                      onClick={() => removeClassesDates(index)}
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
                    id={`classes.${index}.startDate`}
                    label="Data de início"
                    error={!!errors.classes?.[index]?.startDate}
                    helperText={errors.classes?.[index]?.startDate?.message}
                    {...register(`classes.${index}.startDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`classes.${index}.endDate`}
                    label="Data de término"
                    error={!!errors.classes?.[index]?.endDate}
                    helperText={errors.classes?.[index]?.endDate?.message}
                    {...register(`classes.${index}.endDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`classes.${index}.startTime`}
                    label="Horário de início"
                    error={!!errors.classes?.[index]?.startTime}
                    helperText={errors.classes?.[index]?.startTime?.message}
                    {...register(`classes.${index}.startTime`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`classes.${index}.endTime`}
                    label="Horário de término"
                    error={!!errors.classes?.[index]?.endTime}
                    helperText={errors.classes?.[index]?.endTime?.message}
                    {...register(`classes.${index}.endTime`)}
                  />
                </Grid>
                <Grid item xs={classesDates.length > 1 ? 3 : 4}>
                  <Controller
                    name={`classes.${index}.daysOfWeek`}
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
                appendClassesDates({
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
