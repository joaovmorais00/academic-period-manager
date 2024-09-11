
import 'next-auth';
import { DefaultUser, DefaultSession, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    image?: string;
  }
}
