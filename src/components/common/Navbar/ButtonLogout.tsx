"use client";

import {
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.css";

export default function ButtonLogout() {
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false,
    });
    router.push("/login");
  }
  return (
    <ListItem disablePadding onClick={logout}>
      <ListItemButton className={styles.listItem}>
        <ListItemIcon className={styles.listItemIcon}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Sair"} />
      </ListItemButton>
    </ListItem>
  );
}
