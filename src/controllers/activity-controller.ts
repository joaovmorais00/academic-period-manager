import { createDateInDefaultTimezone } from "@/config/dayjs";
import {
  createManyActivities,
  deleteAllSubjectClasses,
  getActivitiesBySubjectIdService,
  getAllActivitiesByUserId,
} from "@/services/activity-service";
import { Activity, ModelActivity } from "@/types/Activity";
import Dates from "@/utils/Dates";
import DaysOfWeek from "@/utils/DaysOfWeek";
import { EventInput, EventSourceInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";
import { title } from "process";
import { start } from "repl";
import SubjectController from "./subject-controller";

async function createMany(
  activities: Activity[],
  userId: string,
  subjectId: string
) {
  let modelActivities: ModelActivity[] = [];
  activities.map((activity) =>
    activity.daysOfWeek.map((dayOfWeek) => {
      modelActivities.push({
        createdByUserId: userId,
        name: subjectId ? `${subjectId}-classes` : activity.name ?? "",
        dayOfWeek: DaysOfWeek.daysOfWeekToNumber(dayOfWeek),
        startDateTime: createDateInDefaultTimezone(
          Dates.createDateTimeString(activity.startDate, activity.startTime)
        ).toDate(),
        endDateTime: createDateInDefaultTimezone(
          Dates.createDateTimeString(activity.endDate, activity.endTime)
        ).toDate(),
        subjectId,
      });
    })
  );
  return await createManyActivities(modelActivities);
}

async function getActivitiesBySubjectId(subjectId: string) {
  const activities = await getActivitiesBySubjectIdService(subjectId);
  return activities.map(
    ({ id, name, startDateTime, endDateTime, dayOfWeek }) => ({
      id,
      name,
      daysOfWeek: [DaysOfWeek.daysOfWeekToString(dayOfWeek)],
      startDate: Dates.DateTimeToStringDate(startDateTime),
      endDate: Dates.DateTimeToStringDate(endDateTime),
      startTime: Dates.DateTimeToStringTime(startDateTime),
      endTime: Dates.DateTimeToStringTime(endDateTime),
    })
  );
}

async function deleteAllSubjectActivities(subjectId: string) {
  return await deleteAllSubjectClasses(subjectId);
}

async function getAllActivitiesFromUserIdToEvents(userId: string) {
  const classes: EventInput[] =
    await SubjectController.getAllClassesByUserIdToEvents(userId);

  const events: EventInput[] = [...classes];

  return events;
}

const ActivityController = {
  createMany,
  getActivitiesBySubjectId,
  deleteAllSubjectActivities,
  getAllActivitiesFromUserIdToEvents,
};

export default ActivityController;
