import { z } from "zod";
import { ZAppointmentSchema } from "./appointment-schema";
import { ZTestSchema } from "./test-schema";

export const ZSubjectSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório.",
  }),
  teacher: z.string().optional(),
  description: z.string().optional(),
  classes: ZAppointmentSchema.array().optional(),
  studyTimes: ZAppointmentSchema.array().optional(),
  tests: ZTestSchema.array().optional(),
});
