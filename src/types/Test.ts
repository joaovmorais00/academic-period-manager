export interface Test {
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  notes?: string;
  score?: string;
  worth?: string;
}

export interface TesttWithId extends Test {
  id: string;
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
}

export interface SchedulerTests {
  tests: Test[];
  subjectId: string;
}
