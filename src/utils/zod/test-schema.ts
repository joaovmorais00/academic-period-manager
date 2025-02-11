import { z } from "zod";

export const ZTestSchema = z.object({
  topic: z.string(),
  notes: z.string().optional(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  worth: z.string().optional(),
  score: z.string().optional(),
});

export const ZSchedulerTestSchema = z.object({
  tests: ZTestSchema.array(),
  subjectId: z.string(),
});
