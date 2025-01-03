"use client";
import SubjectController from "@/controllers/subject-controller";
import styles from "./styles.module.css";

import { Subject, SubjectWithId } from "@/types/Subject";
import { ZSubjectSchema } from "@/utils/zod/subject-schema";
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

interface SubjectFormProps {
  id?: string;
  successfulCreateEvent?: () => void;
}

export default function SubjectForm({
  id = "",
  successfulCreateEvent = () => {},
}: SubjectFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (id !== "") {
      SubjectController.get(id).then((response) => {
        reset(response);
      });
    }
  }, [id]);

  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getFieldState,
  } = useForm<Subject>({
    resolver: zodResolver(ZSubjectSchema),
    defaultValues: {
      title: "",
      teacher: "",
      description: "",
      classes: [
        {
          daysOfWeek: [],
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        },
      ],
    },
  });

  const {
    fields: classesDates,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "classes",
  });

  const onSubmit: SubmitHandler<Subject> = (data) => {
    setLoading(true);
    const subject: Subject = { ...data };
    if (!id) {
      SubjectController.create(subject, session.data?.user?.id ?? "")
        .then((response) => {
          reset();
          toast.success("Disciplina cadastrada com sucesso");
          successfulCreateEvent();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Houve um erro ao cadastrar a disciplina");
        });
    } else {
      SubjectController.update(
        { id, ...subject },
        session.data?.user?.id ?? "",
        getFieldState("classes").isDirty
      )
        .then((response) => {
          toast.success("Disciplina atualizada com sucesso");
          router.push("/subjects");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Houve um erro ao atualizar a disciplina");
        });
    }
    setLoading(false);
  };

  const onError = (errors: FieldErrors<Subject>) => {
    console.log("Erros de validação:", errors);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="title"
            label="Título da Disciplina"
            InputLabelProps={{ shrink: true }}
            autoFocus
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="teacher"
            label="Professor"
            InputLabelProps={{ shrink: true }}
            error={!!errors.teacher}
            helperText={errors.teacher?.message}
            {...register("teacher")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="description"
            label="Descrição"
            InputLabelProps={{ shrink: true }}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register("description")}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className="mb-3">
            {!id ? "Cadastro de " : ""}Aulas
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
                    onClick={() => remove(index)}
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
              append({
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
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        loading={loading}
      >
        {!id ? "Cadastrar" : "Atualizar"}
      </LoadingButton>
    </Box>
  );
}
