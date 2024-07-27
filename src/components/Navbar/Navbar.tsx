import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
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
import ButtonLogout from "./ButtonLogout";

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
        <ListItem disablePadding>
          <Link href={"/"}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <Link href={"/users"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Usuários"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href={"/subjects"}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary={"Disciplinas"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ButtonLogout />
      </List>
    </Drawer>
  );
}
