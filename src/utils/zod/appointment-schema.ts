import { z } from "zod";

export const ZAppointmentSchema = z.object({
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

export const ZStudyTimesSchema = z.object({
  subjectId: z.string(),
  studyTimes: ZAppointmentSchema.array().optional(),
});
