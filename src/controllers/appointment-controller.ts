import { createDateInDefaultTimezone } from "@/config/dayjs";
import {
  createAppointments,
  deleteAllSubjectClasses,
  deleteAllSubjectStudyTimes,
  getAppointmentsBySubjectIdService,
} from "@/services/appointment-service";
import { Appointment, ModelAppointment } from "@/types/Appointment";
import Dates from "@/utils/Dates";
import DaysOfWeek from "@/utils/DaysOfWeek";
import { EventInput } from "@fullcalendar/core/index.js";
import SubjectController from "./subject-controller";

async function createManyClasses(
  appointments: Appointment[],
  userId: string,
  subjectId: string
) {
  let modelAppointments: ModelAppointment[] = [];
  appointments.map((appointment) =>
    appointment.daysOfWeek.map((dayOfWeek) => {
      modelAppointments.push({
        createdByUserId: userId,
        name: subjectId ? `${subjectId}-classes` : appointment.name ?? "",
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
        subjectId,
        type: "CLASS",
      });
    })
  );
  return await createAppointments(modelAppointments);
}

async function createManyStudyTimes(
  appointments: Appointment[],
  userId: string,
  subjectId: string
) {
  let modelAppointments: ModelAppointment[] = [];
  appointments.map((appointment) =>
    appointment.daysOfWeek.map((dayOfWeek) => {
      modelAppointments.push({
        createdByUserId: userId,
        name: subjectId ? `${subjectId}-classes` : appointment.name ?? "",
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
        subjectId,
        type: "STUDY_TIME",
      });
    })
  );
  return await createAppointments(modelAppointments);
}

async function getAppointmentsBySubjectId(subjectId: string) {
  const appointments = await getAppointmentsBySubjectIdService(subjectId);
  return appointments.map(
    ({ id, name, startDateTime, endDateTime, dayOfWeek }) => ({
      id,
      name,
      daysOfWeek: dayOfWeek ? [DaysOfWeek.daysOfWeekToString(dayOfWeek)] : [],
      startDate: Dates.DateTimeToStringDate(startDateTime),
      endDate: Dates.DateTimeToStringDate(endDateTime),
      startTime: Dates.DateTimeToStringTime(startDateTime),
      endTime: Dates.DateTimeToStringTime(endDateTime),
    })
  );
}

async function deleteAllClasses(subjectId: string) {
  return await deleteAllSubjectClasses(subjectId);
}

async function deleteAllStudyTimes(subjectId: string) {
  return await deleteAllSubjectStudyTimes(subjectId);
}

const AppointmentController = {
  createManyClasses,
  getAppointmentsBySubjectId,
  deleteAllClasses,
  deleteAllStudyTimes,
  createManyStudyTimes,
};

export default AppointmentController;
