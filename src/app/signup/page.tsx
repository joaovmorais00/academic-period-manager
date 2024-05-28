"use client";

import Copyright from "@/components/Copyright";
import UserController from "@/controllers/user-controller";
import { User } from "@/types/User";
import { ZUserSchema } from "@/utils/zod/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignUpPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(ZUserSchema),
  });
  const onSubmit: SubmitHandler<User> = (data) => {
    setLoading(true);
    const user: User = { ...data };
    UserController.signup(user)
      .then((response) => {
        reset();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="cpf"
                label="CPF"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                {...register("cpf")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="matricula"
                label="Matrícula"
                error={!!errors.matricula}
                helperText={errors.matricula?.message}
                {...register("matricula")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Cadastrar
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já possui uma conta? Faça Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
