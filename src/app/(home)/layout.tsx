import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import styles from "./page.module.css";
import Navbar from "@/components/common/Navbar/Navbar";
import Copyright from "@/components/Copyright";

export default async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Navbar />
      <Box component={"main"} className={styles.main}>
        {children}
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Box>
  );
}
