import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import ExtraActivityForm from "@/components/ExtraActivities/ExtraActivityForm/ExtraActivityForm";

export default function NewExtraActivity({
  params,
}: {
  params: { id: string };
}) {
  return (
    <TemplatePage title="Atualizar Atividade extra" backButton>
      <ExtraActivityForm id={params.id} />
    </TemplatePage>
  );
}
