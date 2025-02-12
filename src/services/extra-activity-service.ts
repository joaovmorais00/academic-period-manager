"use server";

import { prismaClient } from "@/config/prismaClient";
import { ExtraActivity, ExtraActivityWithId } from "@/types/ExtraActivity";

export async function createExtraActivity(
  extraActivity: ExtraActivity,
  userId: string
) {
  try {
    const { title, notes, link } = extraActivity;

    const response = await prismaClient.extraActivity.create({
      data: {
        createdByUserId: userId,
        title,
        notes,
        link,
      },
    });

    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}
export async function updateExtraActivity(
  extraActivity: ExtraActivityWithId,
  userId: string
) {
  const { id, title, notes, link } = extraActivity;
  return await prismaClient.extraActivity.update({
    where: { id },
    data: {
      createdByUserId: userId,
      title,
      notes,
      link,
    },
  });
}

export async function getExtraActivityById(id: string) {
  return await prismaClient.extraActivity.findFirst({
    where: {
      id,
    },
    include: {
      workSchedules: true,
    },
  });
}

export async function deleteExtraActivity(id: string) {
  return await prismaClient.extraActivity.delete({ where: { id } });
}

export async function getAllExtraActivitiesByUserId(id: string) {
  return await prismaClient.extraActivity.findMany({
    where: { createdByUserId: id },
  });
}

export async function getAllExtraActivitiesEventsByUserId(userId: string) {
  return await prismaClient.extraActivity.findMany({
    where: { createdByUserId: userId },
    include: {
      workSchedules: true,
    },
  });
}
