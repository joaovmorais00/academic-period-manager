import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Box, Typography } from "@mui/material";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Olá {session?.user?.name}</Typography>
    </Box>
  );
}
