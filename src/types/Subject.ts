import { Activity } from "./Activity";
import { Assessment } from "./Assessment";

export interface Subject {
  title: string;
  teacher?: string;
  description?: string;
  classes?: Activity[];
  assessments?: Assessment[];
}

export interface TableSubject {
  id: string;
  title: string;
  teacher: string;
}
