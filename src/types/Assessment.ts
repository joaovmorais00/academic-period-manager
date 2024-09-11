export interface Assessment {
  topics: string;
  startDateTime: string;
  endDateTime: string;
  worth: number;
  grade?: number;
  typeAssessment: string;
}
