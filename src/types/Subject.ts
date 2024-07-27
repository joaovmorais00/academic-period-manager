import { Activity } from "./Activity";

export interface Subject {
  title: string;
  teacher?: string;
  description?: string;
  classes: Activity;
}
