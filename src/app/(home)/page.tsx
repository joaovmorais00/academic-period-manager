import ButtonLogout from "@/components/ButtonLogout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import styles from "../page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className={styles.main}>
      <p>Olá {session?.user?.name}</p>
      <p>Só fica aqui se estiver logado</p>
      <ButtonLogout />
    </main>
  );
}
