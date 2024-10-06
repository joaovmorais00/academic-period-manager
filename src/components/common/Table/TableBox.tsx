import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function TableBox({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ height: 400, width: "100%", overflowX: "auto", marginTop: 2 }}>
      {children}
    </Box>
  );
}
