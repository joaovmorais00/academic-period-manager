export interface Activity {
  name?: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
}

export interface ModelActivity {
  name?: string;
  startDateTime: Date;
  endDateTime: Date;
  dayOfWeek: number;
}
