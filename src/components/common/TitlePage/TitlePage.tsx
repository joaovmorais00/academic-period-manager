"use client";

import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function TitlePage({
  title,
  backButton,
}: {
  title: string;
  backButton: boolean;
}) {
  const router = useRouter();
  return (
    <Box display={"flex"} marginBottom={3}>
      {backButton && (
        <IconButton aria-label="Voltar" onClick={() => router.back()}>
          <ArrowBackIcon />
        </IconButton>
      )}

      <Typography variant="h4" className="mb-3">
        {title}
      </Typography>
    </Box>
  );
}
