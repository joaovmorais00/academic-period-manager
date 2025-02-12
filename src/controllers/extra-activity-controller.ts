import {
  createExtraActivity,
  getExtraActivityById,
  updateExtraActivity,
} from "@/services/extra-activity-service";
import { ExtraActivity, ExtraActivityWithId } from "@/types/ExtraActivity";
import AppointmentController from "./appointment-controller";
import { AppointmentWithId } from "@/types/Appointment";
import DaysOfWeek from "@/utils/DaysOfWeek";
import Dates from "@/utils/Dates";
import { link } from "fs";

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
      "CLASS"
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
    ...response,
    title: response?.title ?? "",
    notes: response?.notes ?? "",
    link: response?.link ?? "",
    workSchedules,
  };
  return extraActivity;
}

const ExtraActivityController = { create, update, get };

export default ExtraActivityController;
