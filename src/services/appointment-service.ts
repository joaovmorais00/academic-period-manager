"use server";

import { prismaClient } from "@/config/prismaClient";
import { ModelAppointment } from "@/types/Appointment";

export async function createManyAppointments(appointments: ModelAppointment[]) {
  try {
    const response = await prismaClient.appointment.createMany({
      data: appointments,
    });
    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}

export async function getAppointmentsBySubjectIdService(subjectId: string) {
  return await prismaClient.appointment.findMany({ where: { subjectId } });
}

export async function getAllAppointmentsByUserId(userId: string) {
  return await prismaClient.appointment.findMany({
    where: { createdByUserId: userId },
  });
}

export async function deleteAllSubjectClasses(subjectId: string) {
  return await prismaClient.appointment.deleteMany({
    where: {
      subjectId,
    },
  });
}
