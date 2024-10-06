import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
} from "@/services/subject-service";
import { Subject, SubjectWithId, TableSubject } from "@/types/Subject";
import ActivityController from "./activity-controller";

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

async function getAll() {
  const response = await getAllSubjects();
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

const SubjectController = { create, get, getAll, remove, update };

export default SubjectController;
