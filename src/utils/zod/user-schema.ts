import { z } from "zod";

export const ZUserSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório.",
  }),
  email: z
    .string({
      required_error: "E-mail é obrigatório.",
    })
    .email({
      message: "E-mail inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatória.",
    })
    .min(8, { message: "Senha deve conter no mínimo 8 caracteres" }),
  isAdmin: z.string().optional(),
});
