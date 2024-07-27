"use server";

import { prismaClient } from "@/config/prismaClient";
import bcrypt from "bcrypt";

export async function createUser(
  name: string,
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
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsersService() {
  try {
    const response = await prismaClient.user.findMany();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserService(id: string) {
  try {
    const response = await prismaClient.user.delete({ where: { id } });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUser(id: string) {
  try {
    const response = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
