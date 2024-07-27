"use server";

import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 6);
};

export const comparePasswords = (
  enteredPassword: string,
  userPassword: string
) => {
  return bcrypt.compareSync(enteredPassword, userPassword);
};
