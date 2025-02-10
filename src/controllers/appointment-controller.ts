import { createDateInDefaultTimezone } from "@/config/dayjs";
import {
  createClasses,
  deleteAllSubjectClasses,
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
  return await createClasses(modelAppointments);
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

async function deleteAllSubjectAppointments(subjectId: string) {
  return await deleteAllSubjectClasses(subjectId);
}

async function getAllAppointmentsFromUserIdToEvents(userId: string) {
  const classes: EventInput[] =
    await SubjectController.getAllClassesByUserIdToEvents(userId);

  const events: EventInput[] = [...classes];

  return events;
}

const AppointmentController = {
  createManyClasses,
  getAppointmentsBySubjectId,
  deleteAllSubjectAppointments,
  getAllAppointmentsFromUserIdToEvents,
};

export default AppointmentController;
