import { z } from "zod";

export const ZAssessmentSchema = z.object({
  topics: z.string(),
  typeAssessment: z.string(),
  startDateTime: z.string(),
  endDateTime: z.string(),
  worth: z.number().optional(),
  grade: z.number().optional(),
});
