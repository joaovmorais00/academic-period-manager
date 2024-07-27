import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  text: string;
  icon: () => OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export default function ItemsNavbar({ link, text, icon }: Props) {
  return (
    <Link href={link}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={"Disciplinas"} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
