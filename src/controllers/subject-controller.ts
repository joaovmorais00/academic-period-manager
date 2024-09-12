import { createSubject, getAllSubjects } from "@/services/subject-service";
import { Subject, TableSubject } from "@/types/Subject";
import ActivityController from "./activity-controller";

async function create(subject: Subject, userId: string) {
  try {
    const createdSubject = await createSubject(subject, userId);
    subject.classes?.forEach(async (activityClass) => {
      await ActivityController.create(activityClass, userId, createdSubject.id);
    });
    return true;
  } catch (error) {
    throw error;
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

const SubjectController = { create, getAll };

export default SubjectController;
