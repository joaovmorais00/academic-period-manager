import AuthController from "@/controllers/auth-controller";
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
          console.log(response, "voltando do login");
          if(response) { 
            const user = {
              id: response.id,
              name: response.name,
              email: response.email,
            }
            return user
          }
          else return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log(session.user, token,  user, "session session")
      session.user.id = token.sub as string; 
      return session;
    },
    // async jwt({ token, account, profile }) {
    //   console.log(token, account, profile, "jwt")
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.id = profile.id
    //   }
    //   return token
    // }
    
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
