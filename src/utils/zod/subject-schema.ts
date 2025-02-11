import { z } from "zod";
import { ZAppointmentSchema } from "./appointment-schema";
import { ZAssessmentSchema } from "./assessment-schema";
import { ZTestSchema } from "./test-schema";

export const ZSubjectSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório.",
  }),
  teacher: z.string().optional(),
  description: z.string().optional(),
  classes: ZAppointmentSchema.array().optional(),
  tests: ZTestSchema.array().optional(),
});
