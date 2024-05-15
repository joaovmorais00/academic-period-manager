import { z } from "zod";

export const ZLoginSchema = z.object({
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
    .min(1, { message: "Senha é obrigatória" }),
});
