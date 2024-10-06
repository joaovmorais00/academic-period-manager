import TitlePage from "@/components/common/TitlePage/TitlePage";
import SubjectForm from "@/components/Subjects/SubjectForm/SubjectForm";
import { Box, Typography } from "@mui/material";

export default function NewSubject() {
  return (
    <Box>
      <TitlePage title="Nova Disciplina" />
      <SubjectForm />
    </Box>
  );
}
