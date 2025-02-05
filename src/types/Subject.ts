import { Appointment, AppointmentWithId } from "./Appointment";
import { Assessment } from "./Assessment";

export interface Subject {
  title: string;
  teacher: string;
  description?: string;
  classes?: Appointment[] | AppointmentWithId[];
  assessments?: Assessment[];
}

export interface SubjectWithId extends Subject {
  id: string;
}

export interface TableSubject {
  id: string;
  title: string;
  teacher: string;
}
