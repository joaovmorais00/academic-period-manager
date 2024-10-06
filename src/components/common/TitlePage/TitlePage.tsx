"use client";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function TitlePage({ title }: { title: string }) {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton aria-label="Voltar" onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h4" className="mb-3">
        {title}
      </Typography>
    </Box>
  );
}
