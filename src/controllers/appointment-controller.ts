import { createDateInDefaultTimezone } from "@/config/dayjs";
import {
  createAppointments,
  deleteAllExtraActivityWorkSchedules,
  deleteAllSubjectClasses,
  deleteAllSubjectStudyTimes,
  getAppointmentsBySubjectIdService,
} from "@/services/appointment-service";
import {
  Appointment,
  AppointmentType,
  ModelAppointment,
} from "@/types/Appointment";
import Dates from "@/utils/Dates";
import DaysOfWeek from "@/utils/DaysOfWeek";

async function createManyAppointments(
  appointments: Appointment[],
  userId: string,
  objectId: string,
  type: AppointmentType
) {
  let modelAppointments: ModelAppointment[] = [];
  appointments.map((appointment) =>
    appointment.daysOfWeek.map((dayOfWeek) => {
      modelAppointments.push({
        createdByUserId: userId,
        dayOfWeek: DaysOfWeek.daysOfWeekToNumber(dayOfWeek),
        startDateTime: createDateInDefaultTimezone(
          Dates.createDateTimeString(
            appointment.startDate,
            appointment.startTime
          )
        ).toDate(),
        endDateTime: createDateInDefaultTimezone(
          Dates.createDateTimeString(appointment.endDate, appointment.endTime)
        ).toDate(),
        subjectId: type !== "EXTRA" ? objectId : undefined,
        extraActivityId: type === "EXTRA" ? objectId : undefined,
        type,
      });
    })
  );
  return await createAppointments(modelAppointments);
}

async function deleteAllClasses(subjectId: string) {
  return await deleteAllSubjectClasses(subjectId);
}

async function deleteAllStudyTimes(subjectId: string) {
  return await deleteAllSubjectStudyTimes(subjectId);
}

async function deleteAllWorkSchedules(extraActivityId: string) {
  return await deleteAllExtraActivityWorkSchedules(extraActivityId);
}

const AppointmentController = {
  deleteAllClasses,
  deleteAllStudyTimes,
  createManyAppointments,
  deleteAllWorkSchedules,
};

export default AppointmentController;
