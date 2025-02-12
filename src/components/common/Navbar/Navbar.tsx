"use client";
import UserController from "@/controllers/user-controller";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TopicIcon from "@mui/icons-material/Topic";
import styles from "./styles.module.css";

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import ButtonLogout from "./ButtonLogout";

interface itemMenu {
  name: string;
  link?: string;
  icon: ReactElement<any, any>;
}

const itemsMenuStudent: itemMenu[] = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Agenda",
    link: "/scheduler",
    icon: <CalendarMonthIcon />,
  },
  {
    name: "Disciplinas",
    link: "/subjects",
    icon: <TopicIcon />,
  },
  {
    name: "Atividades Extra",
    link: "/",
    icon: <PostAddIcon />,
  },
];

const itemsMenuAdmin: itemMenu[] = [
  {
    name: "Usuários",
    link: "/users",
    icon: <PersonIcon />,
  },
];

export default function Navbar() {
  const session = useSession();
  const [itemsMenu, setItemsMenu] = useState<itemMenu[]>([]);

  useEffect(() => {
    if (session.data?.user.id) {
      UserController.isAdmin(session.data?.user.id).then((response) =>
        setItemsMenu(response ? itemsMenuAdmin : itemsMenuStudent)
      );
    }
  }, [session]);
  return (
    <Drawer
      sx={{
        width: 240,
        height: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#242526",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {itemsMenu.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link className={styles.listItem} href={item.link ?? ""}>
              <ListItemButton>
                <ListItemIcon className={styles.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ButtonLogout />
      </List>
    </Drawer>
  );
}
