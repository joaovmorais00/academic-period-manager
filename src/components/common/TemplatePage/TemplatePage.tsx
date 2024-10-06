import { Box } from "@mui/material";
import { ReactNode } from "react";
import TitlePage from "../TitlePage/TitlePage";

export default function TemplatePage({
  title,
  backButton = false,
  children,
}: {
  title: string;
  backButton?: boolean;
  children: ReactNode;
}) {
  return (
    <Box>
      <TitlePage title={title} backButton={backButton} />
      {children}
    </Box>
  );
}
