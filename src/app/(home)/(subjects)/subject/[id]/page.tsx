import SubjectForm from "@/components/Subjects/SubjectForm/SubjectForm";
import { Box, Button, IconButton, Typography } from "@mui/material";
import TitlePage from "@/components/common/TitlePage/TitlePage";

export default function NewSubject({ params }: { params: { id: string } }) {
  return (
    <Box>
      <TitlePage title="Atualizar Página" />
      <SubjectForm id={params.id} />
    </Box>
  );
}
