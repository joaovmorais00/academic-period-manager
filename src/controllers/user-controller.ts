import {
  createUser,
  deleteUserService,
  getAllUsersService,
  getUser,
  updateUser,
} from "@/services/user-service";
import { User } from "@/types/User";

async function signup(user: User) {
  const { name, email, password } = { ...user };
  try {
    const response = await createUser(name, email, password);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const response = await getAllUsersService();
    return response;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id: string) {
  try {
    const response = await deleteUserService(id);
    return response;
  } catch (error) {
    throw error;
  }
}

async function update(id: string, user: User) {
  const { name, email, password } = { ...user };
  try {
    const response = await updateUser(id, name, email, password);
    return response;
  } catch (error) {
    throw error;
  }
}

async function get(id: string) {
  try {
    const response = await getUser(id);
    return response;
  } catch (error) {
    throw error;
  }
}

const UserController = { signup, getAllUsers, deleteUser, update, get };

export default UserController;
