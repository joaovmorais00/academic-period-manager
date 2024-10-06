import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import SubjectForm from "@/components/Subjects/SubjectForm/SubjectForm";

export default function NewSubject() {
  return (
    <TemplatePage title="Nova Disciplina" backButton>
      <SubjectForm />
    </TemplatePage>
  );
}
