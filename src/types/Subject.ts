import { Appointment, AppointmentWithId } from "./Appointment";
import { Test } from "./Test";

export interface Subject {
  title: string;
  teacher: string;
  description?: string;
  classes?: Appointment[] | AppointmentWithId[];
  tests?: Test[];
}

export interface SubjectWithId extends Subject {
  id: string;
}

export interface TableSubject {
  id: string;
  title: string;
  teacher: string;
}
