"use client";
import styles from "./styles.module.css";

import ExtraActivityController from "@/controllers/extra-activity-controller";
import { ExtraActivity } from "@/types/ExtraActivity";
import { ZExtraActivitySchema } from "@/utils/zod/extra-activity-schema";
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

interface ExtraActivityFormProps {
  id?: string;
  successfulCreateEvent?: () => void;
}

export default function ExtraActivityForm({
  id = "",
  successfulCreateEvent = () => {},
}: ExtraActivityFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

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
    if (id !== "") {
      ExtraActivityController.get(id).then((response) => {
        reset(response);
      });
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getFieldState,
  } = useForm<ExtraActivity>({
    resolver: zodResolver(ZExtraActivitySchema),
    defaultValues: {
      title: "",
      notes: "",
      link: "",
      workSchedules: [
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
    fields: workSchedulesDates,
    append: appendWorkSchedulesDates,
    remove: removeWorkSchedulesDates,
  } = useFieldArray({
    control,
    name: "workSchedules",
  });

  const onSubmit: SubmitHandler<ExtraActivity> = (data) => {
    setLoading(true);
    const extraActivity: ExtraActivity = { ...data };
    if (!id) {
      ExtraActivityController.create(
        extraActivity,
        session.data?.user?.id ?? ""
      )
        .then((response) => {
          reset();
          toast.success("Atividade extra cadastrada com sucesso");
          successfulCreateEvent();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Houve um erro ao cadastrar a atividade extra");
        });
    } else {
      ExtraActivityController.update(
        { id, ...extraActivity },
        session.data?.user?.id ?? "",
        getFieldState("workSchedules").isDirty
      )
        .then((response) => {
          toast.success("Atividade extra atualizada com sucesso");
          router.push("/subjects");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Houve um erro ao atualizar a atividade extra");
        });
    }
    setLoading(false);
  };

  const onError = (errors: FieldErrors<ExtraActivity>) => {
    console.log("Erros de validação:", errors);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container rowSpacing={3}>
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
            id="notes"
            multiline
            label="Anotações"
            InputLabelProps={{ shrink: true }}
            error={!!errors.notes}
            helperText={errors.notes?.message}
            {...register("notes")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="link"
            label="Link"
            InputLabelProps={{ shrink: true }}
            error={!!errors.link}
            helperText={errors.link?.message}
            {...register("link")}
          />
        </Grid>
        <Grid item container xs={12} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-3">
              {!id ? "Cadastro de " : ""}Horários
            </Typography>
          </Grid>
          <Grid item container xs={11} rowSpacing={3}>
            {workSchedulesDates.map((field, index) => (
              <Grid
                item
                container
                key={field.id}
                xs={12}
                columnSpacing={1}
                rowSpacing={1}
              >
                {workSchedulesDates.length > 1 && (
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      aria-label="add"
                      size="large"
                      onClick={() => removeWorkSchedulesDates(index)}
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
                    id={`workSchedules.${index}.startDate`}
                    label="Data de início"
                    error={!!errors.workSchedules?.[index]?.startDate}
                    helperText={
                      errors.workSchedules?.[index]?.startDate?.message
                    }
                    {...register(`workSchedules.${index}.startDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`workSchedules.${index}.endDate`}
                    label="Data de término"
                    error={!!errors.workSchedules?.[index]?.endDate}
                    helperText={errors.workSchedules?.[index]?.endDate?.message}
                    {...register(`workSchedules.${index}.endDate`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`workSchedules.${index}.startTime`}
                    label="Horário de início"
                    error={!!errors.workSchedules?.[index]?.startTime}
                    helperText={
                      errors.workSchedules?.[index]?.startTime?.message
                    }
                    {...register(`workSchedules.${index}.startTime`)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    id={`workSchedules.${index}.endTime`}
                    label="Horário de término"
                    error={!!errors.workSchedules?.[index]?.endTime}
                    helperText={errors.workSchedules?.[index]?.endTime?.message}
                    {...register(`workSchedules.${index}.endTime`)}
                  />
                </Grid>
                <Grid item xs={workSchedulesDates.length > 1 ? 3 : 4}>
                  <Controller
                    name={`workSchedules.${index}.daysOfWeek`}
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
                appendWorkSchedulesDates({
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
        {!id ? "Cadastrar" : "Atualizar"}
      </LoadingButton>
    </Box>
  );
}
