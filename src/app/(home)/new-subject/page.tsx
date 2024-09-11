import SubjectForm from "@/components/Subjects/SubjectForm";
import { Box, Typography } from "@mui/material";

export default function NewSubject() {
  return (
    <Box>
      <Typography variant="h4" className="mb-3">
        Nova Disciplina
      </Typography>
      <SubjectForm />
    </Box>
  );
}
