import {
  createSubject,
  deleteSubject,
  getAllClassesByUserId,
  getAllSubjectsByUserId,
  getSubjectById,
  updateSubject,
} from "@/services/subject-service";
import { Subject, SubjectWithId, TableSubject } from "@/types/Subject";
import ActivityController from "./activity-controller";
import dayjs from "dayjs";
import { EventInput } from "@fullcalendar/core/index.js";

async function create(subject: Subject, userId: string) {
  try {
    const createdSubject = await createSubject(subject, userId);
    await ActivityController.createMany(
      subject.classes ?? [],
      userId,
      createdSubject.id
    );
    return true;
  } catch (error) {
    throw error;
  }
}

async function get(id: string) {
  const subject = await getSubjectById(id);
  if (subject) {
    const classes = await ActivityController.getActivitiesBySubjectId(id);

    return {
      ...subject,
      teacher: !subject.teacher ? "" : subject.teacher,
      description: !subject.description ? "" : subject.description,
      classes,
    };
  }
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
  updateClasses: boolean
) {
  await updateSubject(subject, userId);
  if (updateClasses) {
    await ActivityController.deleteAllSubjectActivities(subject.id);
    await ActivityController.createMany(
      subject.classes ?? [],
      userId,
      subject.id
    );
  }
  return true;
}

async function getAllClassesByUserIdToEvents(userId: string) {
  const events: EventInput[] = [];
  const subjects = await getAllClassesByUserId(userId);
  subjects.map((subject) =>
    subject.classes.map((activity) => {
      let dayAux = dayjs(activity.startDateTime);
      const endDate = dayjs(activity.endDateTime);
      while (dayAux.isAfter(endDate, "day") === false) {
        if (dayAux.day() === activity.dayOfWeek) {
          events.push({
            title: subject.title,
            start: dayAux.toDate(),
            end: dayjs(dayAux)
              .set("hour", endDate.hour())
              .set("minute", 30)
              .toDate(),
            backgroundColor: "green",
            textColor: "white",
            infos: {
              eventType: "class",
              teacher: subject.teacher,
              description: subject.description,
            },
          });
        }
        dayAux = dayAux.add(1, "day");
      }
    })
  );
  return events;
}

const SubjectController = {
  create,
  get,
  getAllByUserId,
  remove,
  update,
  getAllClassesByUserIdToEvents,
};

export default SubjectController;
