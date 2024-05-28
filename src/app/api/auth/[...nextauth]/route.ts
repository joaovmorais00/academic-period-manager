import AuthController from "@/controllers/auth-controller";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const response = await AuthController.signin(
            credentials.email,
            credentials.password
          );
          return {
            id: response.id,
            name: response.name,
            email: response.email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
