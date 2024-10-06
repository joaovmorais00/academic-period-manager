"use client";
import UserController from "@/controllers/user-controller";
import { CompletedUser, User } from "@/types/User";
import { ZUserSchema } from "@/utils/zod/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UserFormProps {
  id?: string;
  userInfos?: CompletedUser;
  successufulUpdate?: () => void;
}

export default function UserForm({
  id = "",
  userInfos,
  successufulUpdate = () => {},
}: UserFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(ZUserSchema),
    defaultValues: {
      name: !id ? "" : userInfos?.name,
      email: !id ? "" : userInfos?.email,
      password: !id ? "" : userInfos?.password,
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    setLoading(true);
    const user: User = { ...data };
    if (id === "") {
      UserController.signup(user)
        .then((response) => {
          reset();
          toast.success("Usuário cadastrado com sucesso");
          setLoading(false);
          router.push("/login");
        })
        .catch((error) => {
          setLoading(false);
          toast.success("Houve um erro ao cadastrar o usuário");
        });
    } else {
      UserController.update(id, user)
        .then((response) => {
          reset();
          toast.success("Usuário atualizado com sucesso");
          successufulUpdate();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.success("Houve um erro ao atualizar o usuário");
        });
    }
  };
  return (
    <Box
      sx={{
        marginTop: !id ? 8 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!id && (
        <>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
        </>
      )}
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
              id="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          {!id ? "Cadastrar" : "Atualizar"}
        </LoadingButton>
        {!id && (
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já possui uma conta? Faça Login
              </Link>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
