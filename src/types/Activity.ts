export interface Activity {
  name?: string | null;
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
}

export interface ActivityWithId extends Activity {
  id: string;
}

export interface ModelActivity {
  createdByUserId: string;
  name?: string;
  startDateTime: Date;
  endDateTime: Date;
  dayOfWeek: number;
  subjectId?: string;
}
