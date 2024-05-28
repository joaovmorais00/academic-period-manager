"use server";

import { prismaClient } from "@/config/prismaClient";
import bcrypt from "bcrypt";

export async function createUser(
  name: string,
  cpf: string,
  matricula: string,
  email: string,
  password: string
) {
  try {
    const findUser = await prismaClient.user.findFirst({
      where: { email },
    });
    if (findUser) {
      throw new Error("Esse e-mail está em uso");
    }

    const response = await prismaClient.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        cpf,
        matricula,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
