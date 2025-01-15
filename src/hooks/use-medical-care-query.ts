import { TypedSupabaseClient } from '@/lib/supabase';
import { selectMedicalCareTemplates } from '@/queries/select-medical-care-templates';

const useMedicalCareTemplateAll = ({ client }: { client: TypedSupabaseClient }) => {
  const queryKey = ['medical_care_templates', 'all'];
  const queryFn = async () => {
    return selectMedicalCareTemplates(client).then((res) => res.data);
  };
  return { queryKey, queryFn };
};

export { useMedicalCareTemplateAll };
