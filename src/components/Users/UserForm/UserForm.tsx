"use client";
import UserController from "@/controllers/user-controller";
import { CompletedUser, User } from "@/types/User";
import { ZUserSchema } from "@/utils/zod/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UserFormProps {
  id?: string;
  userInfos?: CompletedUser;
  successufulUpdate?: () => void;
  allowDelete?: boolean;
  isAdmin?: boolean;
}

export default function UserForm({
  id = "",
  userInfos,
  successufulUpdate = () => {},
  allowDelete = false,
  isAdmin = false,
}: UserFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  function handleDeleteUser() {
    setLoading(true);
    UserController.deleteUser(id)
      .then(() => {
        toast.success("Usuário excluído com sucesso");
        router.push("/login");
      })
      .catch((error) => {
        toast.error("Não foi possível excluir o usuário");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (id !== "") {
      reset(userInfos);
    }
  }, [id, userInfos]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(ZUserSchema),
    defaultValues: {
      name: !id ? "" : userInfos?.name,
      email: !id ? "" : userInfos?.email,
      password: !id ? "" : userInfos?.password,
      isAdmin: "false",
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
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginTop={!id ? 8 : 0}
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
        marginTop={3}
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
              InputLabelProps={{ shrink: !!id }}
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
              InputLabelProps={{ shrink: !!id }}
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
              InputLabelProps={{ shrink: !!id }}
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
          {isAdmin && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Administrador:</Typography>
              <FormControl>
                <Controller
                  name="isAdmin"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Não"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Sim"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid container columnSpacing={3} justifyContent="center">
          {allowDelete && (
            <Grid item xs={4}>
              <LoadingButton
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
                color="inherit"
                onClick={handleDeleteUser}
              >
                Excluir
              </LoadingButton>
            </Grid>
          )}
          <Grid item xs={allowDelete ? 4 : 12}>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              {!id ? "Cadastrar" : "Atualizar"}
            </LoadingButton>
          </Grid>
        </Grid>
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
