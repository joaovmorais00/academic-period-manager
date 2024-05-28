import { createUser } from "@/services/user-service";
import { User } from "@/types/User";

async function signup(user: User) {
  const { name, cpf, matricula, email, password } = { ...user };
  try {
    const response = await createUser(name, cpf, matricula, email, password);
    return response;
  } catch (error) {
    throw error;
  }
}

const UserController = { signup };

export default UserController;
