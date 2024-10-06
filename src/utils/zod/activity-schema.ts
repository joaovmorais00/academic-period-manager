import { z } from "zod";

export const ZActivitySchema = z.object({
  name: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  daysOfWeek: z.string().array(),
  startTime: z.string(),
  endTime: z.string(),
});
