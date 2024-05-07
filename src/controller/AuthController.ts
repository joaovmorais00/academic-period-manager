import { api } from "@/lib/axios";
import { User } from "@/types/User";

export async function signup(user: User) {
  console.log(user);
  try {
    await api.post("/signup", { ...user });
  } catch (error) {
    throw error;
  }
}
