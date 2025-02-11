import { createDateInDefaultTimezone } from "@/config/dayjs";
import {
  createTests,
  deleteAllTestsBySubjectId,
} from "@/services/test-service";
import { ModelTest, Test } from "@/types/Test";
import Dates from "@/utils/Dates";

async function createManyTests(
  tests: Test[],
  userId: string,
  subjectId: string
) {
  try {
    let modelTests: ModelTest[] = tests.map((test) => ({
      createdByUserId: userId,
      subjectId,
      notes: test.notes,
      topic: test.topic,
      score: test.score ? Number(test.score) : undefined,
      worth: test.worth ? Number(test.worth) : undefined,
      startDateTime: createDateInDefaultTimezone(
        Dates.createDateTimeString(test.date, test.startTime)
      ).toDate(),
      endDateTime: createDateInDefaultTimezone(
        Dates.createDateTimeString(test.date, test.endTime)
      ).toDate(),
    }));
    return await createTests(modelTests);
  } catch (error) {
    throw error;
  }
}

async function deleteAllSubjectTests(subjectId: string) {
  return await deleteAllTestsBySubjectId(subjectId);
}

const TestController = {
  createManyTests,
  deleteAllSubjectTests,
};

export default TestController;
