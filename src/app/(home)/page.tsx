import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>Olá {session?.user?.name}</p>
      <p>Só fica aqui se estiver logado</p>
    </div>
  );
}
