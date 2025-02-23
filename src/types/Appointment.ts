export interface Appointment {
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  local?: string;
}

export interface AppointmentWithId extends Appointment {
  id: string;
}

export interface ModelAppointment {
  createdByUserId: string;
  startDateTime: Date;
  endDateTime: Date;
  dayOfWeek?: number;
  subjectId?: string;
  extraActivityId?: string;
  testId?: string;
  notes?: string;
  type: AppointmentType;
  local?: string;
}

export interface SchedulerClasses {
  subjectId: string;
  classes: Appointment[];
}

export interface SchedulerStudyTimes {
  subjectId: string;
  studyTimes: Appointment[];
}

export type AppointmentType = "CLASS" | "STUDY_TIME" | "EXTRA";
