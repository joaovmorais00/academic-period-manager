"use client";

import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SubjectsPage() {
  const router = useRouter();
  return (
    <Box>
      <Typography variant="h4" className="mb-3">
        Disciplinas
      </Typography>
      <Box marginTop={2}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/new-subject")}
        >
          Nova Disciplina
        </Button>
      </Box>
    </Box>
  );
}
