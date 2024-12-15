import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function TableBox({ children }: { children: ReactNode }) {
  return (
    <Box height={400} width={"100%"} sx={{ overflowX: "auto" }}>
      {children}
    </Box>
  );
}
