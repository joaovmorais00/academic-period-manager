import { createDateInDefaultTimezone } from "@/config/dayjs";
import { createActivity } from "@/services/activity-service";
import { createSubject } from "@/services/subject-service";
import { Activity, ModelActivity } from "@/types/Activity";
import { Subject } from "@/types/Subject";
import { createDateTimeString } from "@/utils/createDateTimeString";
import { daysOfWeekToNumber } from "@/utils/daysOfWeekToNumber";
import dayjs from "dayjs";

async function create(activity: Activity, userId: string, subjectId: string) {
  try {
    activity.daysOfWeek.forEach(async (day) => {
      const modelActivity: ModelActivity = {
        dayOfWeek: daysOfWeekToNumber(day),
        startDateTime: createDateInDefaultTimezone(
          createDateTimeString(activity.startDate, activity.startTime)
        ).toDate(),
        endDateTime: createDateInDefaultTimezone(
          createDateTimeString(activity.endDate, activity.endTime)
        ).toDate(),
      };
      await createActivity(modelActivity, userId, subjectId);
    });

    return true;
  } catch (error) {
    throw error;
  }
}

const ActivityController = { create };

export default ActivityController;
