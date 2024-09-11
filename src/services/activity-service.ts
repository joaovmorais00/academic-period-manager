"use server";

import { prismaClient } from "@/config/prismaClient";
import { ModelActivity } from "@/types/Activity";
import { Subject } from "@/types/Subject";

export async function createActivity(
  activity: ModelActivity,
  userId: string,
  subjectId?: string
) {
  try {
    const response = await prismaClient.activity.create({
      data: {
        createdByUserId: userId,
        name: subjectId ? `${subjectId}-classes` : activity.name ?? "",
        startDateTime: activity.startDateTime,
        endDateTime: activity.endDateTime,
        dayOfWeek: activity.dayOfWeek,
        subjectId,
      },
    });
    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}
