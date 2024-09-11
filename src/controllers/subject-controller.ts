import { createSubject } from "@/services/subject-service";
import { Subject } from "@/types/Subject";
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

const SubjectController = { create };

export default SubjectController;
