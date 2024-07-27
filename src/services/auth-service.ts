"use server";

import { prismaClient } from "@/config/prismaClient";
import bcrypt from "bcrypt";

export async function login(email: string, password: string) {
  const findUser = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser) {
    throw new Error("Usuário não encontrado");
  }

  if (!bcrypt.compareSync(password, findUser.password)) {
    throw new Error("Senha incorreta");
  } else {
    return findUser;
  }
}
