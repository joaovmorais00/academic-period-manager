import {
  createExtraActivity,
  deleteExtraActivity,
  getAllExtraActivitiesByUserId,
  getExtraActivityById,
  updateExtraActivity,
} from "@/services/extra-activity-service";
import { AppointmentWithId } from "@/types/Appointment";
import {
  ExtraActivity,
  ExtraActivityWithId,
  TableExtraActivity,
} from "@/types/ExtraActivity";
import Dates from "@/utils/Dates";
import DaysOfWeek from "@/utils/DaysOfWeek";
import AppointmentController from "./appointment-controller";

async function create(extraActivity: ExtraActivity, userId: string) {
  try {
    const createdExtraActivity = await createExtraActivity(
      extraActivity,
      userId
    );
    await AppointmentController.createManyAppointments(
      extraActivity.workSchedules ?? [],
      userId,
      createdExtraActivity.id,
      "EXTRA"
    );

    return true;
  } catch (error) {
    console.log(error, "create");
    throw error;
  }
}

async function update(
  extraActivity: ExtraActivityWithId,
  userId: string,
  updateWorkSchedules: boolean
) {
  await updateExtraActivity(extraActivity, userId);
  if (updateWorkSchedules) {
    await AppointmentController.deleteAllWorkSchedules(extraActivity.id);

    await AppointmentController.createManyAppointments(
      extraActivity.workSchedules ?? [],
      userId,
      extraActivity.id,
      "EXTRA"
    );
  }
  return true;
}

async function get(id: string) {
  const response = await getExtraActivityById(id);
  const workSchedules = response?.workSchedules.reduce(
    (
      acc: AppointmentWithId[],
      { id, startDateTime, endDateTime, dayOfWeek, type }
    ) => {
      if (type === "EXTRA") {
        acc.push({
          id,
          daysOfWeek: dayOfWeek
            ? [DaysOfWeek.daysOfWeekToString(dayOfWeek)]
            : [],
          startDate: Dates.DateTimeToStringDate(startDateTime),
          endDate: Dates.DateTimeToStringDate(endDateTime),
          startTime: Dates.DateTimeToStringTime(startDateTime),
          endTime: Dates.DateTimeToStringTime(endDateTime),
        });
      }
      return acc;
    },
    []
  );

  const extraActivity = {
    id,
    title: response?.title ?? "",
    notes: response?.notes ?? "",
    link: response?.link ?? "",
    workSchedules: workSchedules ?? [],
  };
  return extraActivity;
}

async function remove(id: string) {
  return await deleteExtraActivity(id);
}

async function getAllByUserId(userId: string) {
  const response = await getAllExtraActivitiesByUserId(userId);
  const extraActivities: TableExtraActivity[] = response.map(
    ({ id, title }) =>
      ({
        id,
        title,
      } as TableExtraActivity)
  );
  return extraActivities;
}

const ExtraActivityController = { create, update, get, remove, getAllByUserId };

export default ExtraActivityController;
