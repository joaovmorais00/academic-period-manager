import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import SubjectForm from "@/components/Subjects/SubjectForm/SubjectForm";

export default function NewSubject({ params }: { params: { id: string } }) {
  return (
    <TemplatePage title="Atualizar Disciplina" backButton>
      <SubjectForm id={params.id} />
    </TemplatePage>
  );
}
