import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("sessios", session);
  }
  return <>{children}</>;
}
