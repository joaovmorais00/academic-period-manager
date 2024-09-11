import { z } from "zod";
import { ZActivitySchema } from "./activity-schema";
import { ZAssessmentSchema } from "./assessment-schema";

export const ZSubjectSchema = z.object({
  title: z.string({
    required_error: "Título é obrigatório.",
  }),
  teacher: z.string().optional(),
  description: z.string().optional(),
  classes: ZActivitySchema.array().optional(),
  assessments: ZAssessmentSchema.array().optional(),
});
