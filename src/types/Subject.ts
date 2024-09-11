import { Activity, BackendActivity } from "./Activity";
import { Assessment } from "./Assessment";

export interface Subject {
  title: string;
  teacher?: string;
  description?: string;
  classes?: Activity[];
  assessments?: Assessment[];
}


