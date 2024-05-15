import { api } from "@/lib/axios";
import { User } from "@/types/User";

async function signup(user: User) {
  console.log(user);
  try {
    await api.post("/user", { ...user });
  } catch (error) {
    throw error;
  }
}

async function login(email: string, password: string) {
  try {
    return await api.post("/login", {
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
}

const AuthController = { signup, login };

export default AuthController;
