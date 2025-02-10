import { z } from "zod";
import { ZAppointmentSchema } from "./appointment-schema";
import { ZAssessmentSchema } from "./assessment-schema";

export const ZSubjectSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório.",
  }),
  teacher: z.string().optional(),
  description: z.string().optional(),
  classes: ZAppointmentSchema.array().optional(),
  assessments: ZAssessmentSchema.array().optional(),
});
