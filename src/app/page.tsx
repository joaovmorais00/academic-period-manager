import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession();

  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className={styles.main}>
      <p>Olá {session?.user?.name}</p>
      <p>Só fica aqui se estiver logado</p>
    </main>
  );
}
