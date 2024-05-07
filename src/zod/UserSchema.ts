import { z } from "zod";

export const ZUserSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório.",
    })
    .min(5, "Nome é obrigatório."),
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
  cpf: z
    .string({
      required_error: "CPF é obrigatório.",
    })
    .length(11, "CPF deve conter 11 caracteres.")
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "");
      return !!Number(replacedDoc);
    }, "CPF deve conter apenas números."),
  matricula: z
    .string({
      required_error: "Matricula é obrigatória.",
    })
    .length(9, "Matricula deve conter 11 caracteres.")
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, "");
      return !!Number(replacedDoc);
    }, "Matricula deve conter apenas números."),
});
