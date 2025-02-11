"use client";
import SubjectController from "@/controllers/subject-controller";
import styles from "./styles.module.css";

import TestController from "@/controllers/test-controller";
import { TableSubject } from "@/types/Subject";
import { SchedulerTests } from "@/types/Test";
import { ZSchedulerTestSchema } from "@/utils/zod/test-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
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

interface ClassFormProps {
  successfulCreateEvent?: () => void;
}

export default function TestForm({
  successfulCreateEvent = () => {},
}: ClassFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const [subjects, setSubjects] = useState<TableSubject[]>([]);

  const typeTests = [
    {
      key: "TEST",
      name: "Prova",
    },
    {
      key: "SEMINAR",
      name: "Seminário",
    },
    {
      key: "ARTICLE",
      name: "Artigo",
    },
    {
      key: "EXERCISE",
      name: "Lista de exercícios",
    },
    {
      key: "OTHER",
      name: "Outro",
    },
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
  } = useForm<SchedulerTests>({
    resolver: zodResolver(ZSchedulerTestSchema),
    defaultValues: {
      tests: [
        {
          topic: "",
          notes: "",
          date: "",
          startTime: "",
          endTime: "",
          score: "",
          worth: "",
          link: "",
          typeTest: "",
        },
      ],
      subjectId: "",
    },
  });

  const {
    fields: testsDates,
    append: appendTestsDates,
    remove: removeTestsDates,
  } = useFieldArray({
    control,
    name: "tests",
  });

  const onSubmit: SubmitHandler<SchedulerTests> = ({ tests, subjectId }) => {
    setLoading(true);

    TestController.createManyTests(
      tests,
      session.data?.user?.id ?? "",
      subjectId
    )
      .then(() => {
        reset();
        toast.success("Prova cadastrada com sucesso");
        successfulCreateEvent();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Houve um erro ao cadastrar a aula");
      });

    setLoading(false);
  };

  const onError = (errors: FieldErrors<SchedulerTests>) => {
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
              Provas
            </Typography>
          </Grid>
          <Grid item container xs={11} rowSpacing={3}>
            {testsDates.map((field, index) => (
              <Grid item container key={field.id} xs={12} columnSpacing={1}>
                {testsDates.length > 1 && (
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      aria-label="add"
                      size="large"
                      onClick={() => removeTestsDates(index)}
                    >
                      <RemoveIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                )}
                <Grid
                  item
                  container
                  xs={testsDates.length > 1 ? 11 : 12}
                  columnSpacing={1}
                  rowSpacing={1}
                >
                  <Grid item xs={2}>
                    <Controller
                      name={`tests.${index}.typeTest`}
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel id="typeTest">
                            Tipo da atividade
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="typeTest"
                            label="typeTest"
                            input={<OutlinedInput label="Tipo da atividade" />}
                          >
                            {typeTests.map(({ key, name }) => (
                              <MenuItem value={key} key={key}>
                                {name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.startDate`}
                      label="Data"
                      error={!!errors.tests?.[index]?.date}
                      helperText={errors.tests?.[index]?.date?.message}
                      {...register(`tests.${index}.date`)}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.startTime`}
                      label="Horário de início"
                      error={!!errors.tests?.[index]?.startTime}
                      helperText={errors.tests?.[index]?.startTime?.message}
                      {...register(`tests.${index}.startTime`)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      type="time"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.endTime`}
                      label="Horário de término"
                      error={!!errors.tests?.[index]?.endTime}
                      helperText={errors.tests?.[index]?.endTime?.message}
                      {...register(`tests.${index}.endTime`)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.worth`}
                      label="Valor"
                      error={!!errors.tests?.[index]?.worth}
                      helperText={errors.tests?.[index]?.worth?.message}
                      {...register(`tests.${index}.worth`)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.score`}
                      label="Nota"
                      error={!!errors.tests?.[index]?.score}
                      helperText={errors.tests?.[index]?.score?.message}
                      {...register(`tests.${index}.score`)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      multiline
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.topic`}
                      label="Assunto"
                      error={!!errors.tests?.[index]?.topic}
                      helperText={errors.tests?.[index]?.topic?.message}
                      {...register(`tests.${index}.topic`)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      multiline
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.notes`}
                      label="Anotações"
                      error={!!errors.tests?.[index]?.notes}
                      helperText={errors.tests?.[index]?.notes?.message}
                      {...register(`tests.${index}.notes`)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id={`tests.${index}.link`}
                      label="Link"
                      error={!!errors.tests?.[index]?.link}
                      helperText={errors.tests?.[index]?.link?.message}
                      {...register(`tests.${index}.link`)}
                    />
                  </Grid>
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
                appendTestsDates({
                  topic: "",
                  notes: "",
                  date: "",
                  startTime: "",
                  endTime: "",
                  score: "",
                  worth: "",
                  link: "",
                  typeTest: "",
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
