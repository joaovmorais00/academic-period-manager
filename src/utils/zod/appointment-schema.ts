import { z } from "zod";

export const ZAppointmentSchema = z.object({
  name: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  daysOfWeek: z.string().array(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ZSchedulerClassSchema = z.object({
  subjectId: z.string(),
  classes: ZAppointmentSchema.array().optional(),
});
