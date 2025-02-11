export interface Appointment {
  name?: string | null;
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
}

export interface AppointmentWithId extends Appointment {
  id: string;
}

export interface ModelAppointment {
  createdByUserId: string;
  name?: string;
  startDateTime: Date;
  endDateTime: Date;
  dayOfWeek?: number;
  subjectId?: string;
  testId?: string;
  notes?: string;
  type?: "CLASS" | "STUDY_TIME";
}

export interface SchedulerClasses {
  subjectId: string;
  classes: Appointment[];
}
