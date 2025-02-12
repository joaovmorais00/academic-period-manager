import TemplatePage from "@/components/common/TemplatePage/TemplatePage";
import ExtraActivityForm from "@/components/ExtraActivities/ExtraActivityForm/ExtraActivityForm";

export default function NewExtraActivity() {
  return (
    <TemplatePage title="Nova Atividade Extra" backButton>
      <ExtraActivityForm />
    </TemplatePage>
  );
}
