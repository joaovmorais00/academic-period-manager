"use server";

import { prismaClient } from "@/config/prismaClient";
import { ModelTest } from "@/types/Test";

export async function createTests(tests: ModelTest[]) {
  try {
    const response = await prismaClient.test.createMany({
      data: tests,
    });
    return response;
  } catch (error) {
    console.error(error, "service");
    throw error;
  }
}
