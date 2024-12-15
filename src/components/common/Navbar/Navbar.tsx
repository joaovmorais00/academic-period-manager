import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
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
import Link from "next/link";
import { ReactElement } from "react";
import ButtonLogout from "./ButtonLogout";

interface itemMenu {
  name: string;
  link: string;
  icon: ReactElement<any, any>;
}

const itemsMenu: itemMenu[] = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Usuários",
    link: "/users",
    icon: <PersonIcon />,
  },
  {
    name: "Disciplinas",
    link: "/subjects",
    icon: <BookIcon />,
  },
  {
    name: "Agenda",
    link: "/scheduler",
    icon: <CalendarMonthIcon />,
  },
];

export default function Navbar() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {itemsMenu.map((item) => (
          <ListItem disablePadding>
            <Link href={item.link}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
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
