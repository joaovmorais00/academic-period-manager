"use server";

import { prismaClient } from "@/config/prismaClient";
import { Subject } from "@/types/Subject";

export async function createSubject(subject: Subject, userId: string) {
  try {
    const { title, description, teacher } = subject;

    const response = await prismaClient.subject.create({
      data: {
        createdByUserId: userId,
        title,
        description,
        teacher,
      },
    });
    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}

export async function getAllSubjects() {
  return await prismaClient.subject.findMany();
}

export async function deleteSubject(id: string) {
  return await prismaClient.subject.delete({ where: { id } });
}
