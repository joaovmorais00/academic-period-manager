"use server";

import { prismaClient } from "@/config/prismaClient";
import { ModelActivity } from "@/types/Activity";

export async function createManyActivities(activities: ModelActivity[]) {
  try {
    const response = await prismaClient.activity.createMany({
      data: activities,
    });
    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}

export async function getActivitiesBySubjectIdService(subjectId: string) {
  return await prismaClient.activity.findMany({ where: { subjectId } });
}

export async function deleteAllSubjectClasses(subjectId: string) {
  return await prismaClient.activity.deleteMany({
    where: {
      subjectId,
    },
  });
}
