import { z } from "zod";
import { ZAppointmentSchema } from "./appointment-schema";

export const ZExtraActivitySchema = z.object({
  title: z.string(),
  notes: z.string().optional(),
  link: z.string().optional(),
  workSchedules: ZAppointmentSchema.array(),
});
