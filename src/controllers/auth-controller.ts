import { login } from "@/services/auth-service";

async function signin(email: string, password: string) {
  try {
    return await login(email, password);
  } catch (error) {
    throw error;
  }
}

const AuthController = { signin };

export default AuthController;
