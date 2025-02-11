"use server";

import { prismaClient } from "@/config/prismaClient";
import { Subject, SubjectWithId } from "@/types/Subject";

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

export async function updateSubject(subject: SubjectWithId, userId: string) {
  const { id, title, description, teacher } = subject;
  return await prismaClient.subject.update({
    where: { id },
    data: {
      createdByUserId: userId,
      title,
      description,
      teacher,
    },
  });
}

export async function getAllSubjectsByUserId(id: string) {
  return await prismaClient.subject.findMany({
    where: { createdByUserId: id },
  });
}

export async function deleteSubject(id: string) {
  return await prismaClient.subject.delete({ where: { id } });
}

export async function getAllSubjectsEventsByUserId(userId: string) {
  return await prismaClient.subject.findMany({
    where: { createdByUserId: userId },
    include: {
      classesAndStudyTimes: true,
      tests: true,
    },
  });
}

export async function getSubjectById(id: string) {
  return await prismaClient.subject.findFirst({
    where: {
      id,
    },
    include: {
      classesAndStudyTimes: true,
      tests: true,
    },
  });
}
