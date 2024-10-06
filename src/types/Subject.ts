import { Activity, ActivityWithId } from "./Activity";
import { Assessment } from "./Assessment";

export interface Subject {
  title: string;
  teacher: string;
  description?: string;
  classes?: Activity[] | ActivityWithId[];
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
