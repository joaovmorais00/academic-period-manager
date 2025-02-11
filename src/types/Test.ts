export interface Test {
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  notes?: string;
  score?: string;
  worth?: string;
  link?: string;
  typeTest: string;
}

export interface ModelTest {
  createdByUserId: string;
  startDateTime: Date;
  endDateTime: Date;
  subjectId?: string;
  notes?: string;
  topic?: string;
  score?: number;
  worth?: number;
  link?: string;
  type: string;
}

export interface SchedulerTests {
  tests: Test[];
  subjectId: string;
}
