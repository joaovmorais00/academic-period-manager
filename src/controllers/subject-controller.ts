import {
  createSubject,
  deleteSubject,
  getAllSubjectsByUserId,
  getAllSubjectsEventsByUserId,
  getSubjectById,
  updateSubject,
} from "@/services/subject-service";
import { AppointmentWithId } from "@/types/Appointment";
import { Subject, SubjectWithId, TableSubject } from "@/types/Subject";
import Dates from "@/utils/Dates";
import DaysOfWeek from "@/utils/DaysOfWeek";
import { EventInput } from "@fullcalendar/core/index.js";
import dayjs from "dayjs";
import AppointmentController from "./appointment-controller";
import TestController from "./test-controller";

async function create(subject: Subject, userId: string) {
  try {
    const createdSubject = await createSubject(subject, userId);
    await AppointmentController.createManyClasses(
      subject.classes ?? [],
      userId,
      createdSubject.id
    );
    await TestController.createManyTests(
      subject.tests ?? [],
      userId,
      createdSubject.id
    );

    return true;
  } catch (error) {
    console.log(error, "create disciplina");
    throw error;
  }
}

async function get(id: string) {
  const response = await getSubjectById(id);
  const classes = response?.classesAndStudyTimes.reduce(
    (
      acc: AppointmentWithId[],
      { id, name, startDateTime, endDateTime, dayOfWeek, type }
    ) => {
      if (type === "CLASS") {
        acc.push({
          id,
          name,
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
  const tests = response?.tests.map(
    ({
      id,
      topic,
      notes,
      startDateTime,
      endDateTime,
      score,
      worth,
      link,
      type,
    }) => ({
      id,
      topic: topic ?? "",
      notes: notes ?? "",
      date: Dates.DateTimeToStringDate(startDateTime),
      startTime: Dates.DateTimeToStringTime(startDateTime),
      endTime: Dates.DateTimeToStringTime(endDateTime),
      score: score?.toString(),
      worth: worth?.toString(),
      link: link ?? "",
      typeTest: type ?? "test",
    })
  );
  const subject = {
    ...response,
    title: response?.title ?? "",
    teacher: !response?.teacher ? "" : response.teacher,
    description: !response?.description ? "" : response.description,
    classes,
    tests,
  };
  return subject;
}

async function getAllByUserId(userId: string) {
  const response = await getAllSubjectsByUserId(userId);
  const subjects: TableSubject[] = response.map(
    ({ id, title, teacher }) =>
      ({
        id,
        title,
        teacher,
      } as TableSubject)
  );
  return subjects;
}

async function remove(id: string) {
  return await deleteSubject(id);
}

async function update(
  subject: SubjectWithId,
  userId: string,
  updateClasses: boolean,
  updateTests: boolean
) {
  await updateSubject(subject, userId);
  if (updateClasses) {
    await AppointmentController.deleteAllClasses(subject.id);

    await AppointmentController.createManyClasses(
      subject.classes ?? [],
      userId,
      subject.id
    );
  }
  if (updateTests) {
    await TestController.deleteAllSubjectTests(subject.id);
    await TestController.createManyTests(
      subject.tests ?? [],
      userId,
      subject.id
    );
  }
  return true;
}

const getTypeTestTitle = (keyTypeTest: string) => {
  switch (keyTypeTest) {
    case "TEST":
      return "Prova";
    case "SEMINAR":
      return "Seminário";
    case "ARTICLE":
      return "Artigo";
    case "EXERCISE":
      return "Lista de exercícios";
    default:
      return "Outro";
  }
};

async function getAllEventsByUserId(userId: string) {
  const events: EventInput[] = [];
  const subjects = await getAllSubjectsEventsByUserId(userId);
  subjects.map((subject) => {
    subject.classesAndStudyTimes.map((appointment) => {
      let dayAux = dayjs(appointment.startDateTime);
      const endDate = dayjs(appointment.endDateTime);
      while (dayAux.isAfter(endDate, "day") === false) {
        if (dayAux.day() === appointment.dayOfWeek) {
          events.push({
            title: `${appointment.type === "CLASS" ? "Aula de " : "Estudar"} ${
              subject.title
            }`,
            start: dayAux.toDate(),
            end: dayjs(dayAux)
              .set("hour", endDate.hour())
              .set("minute", endDate.minute())
              .toDate(),
            backgroundColor: appointment.type === "CLASS" ? "green" : "gray",
            textColor: "white",
            infos: {
              eventType: appointment.type,
              teacher: subject.teacher,
              description: subject.description,
            },
          });
        }
        dayAux = dayAux.add(1, "day");
      }
    });
    subject.tests.map((test) => {
      events.push({
        title: `${getTypeTestTitle(test.type)} de ${subject.title}`,
        start: dayjs(test.startDateTime).toDate(),
        end: dayjs(test.endDateTime).toDate(),
        backgroundColor: "blue",
        textColor: "white",
        infos: {
          eventType: "test",
          teacher: subject.teacher,
          topic: test.topic,
          notes: test.notes,
          score: test.score,
          worth: test.worth,
        },
      });
    });
  });
  return events;
}

const SubjectController = {
  create,
  get,
  getAllByUserId,
  remove,
  update,
  getAllEventsByUserId,
};

export default SubjectController;
