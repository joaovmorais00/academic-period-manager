import { Appointment } from "./Appointment";

export interface ExtraActivity {
  title: string;
  notes?: string;
  link?: string;
  workSchedules: Appointment[];
}

export interface ExtraActivityWithId extends ExtraActivity {
  id: string;
}
