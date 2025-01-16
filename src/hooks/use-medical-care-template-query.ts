import { TypedSupabaseClient } from '@/lib/supabase';
import { selectMedicalCareTemplates } from '@/queries/select-medical-care-templates';
import { Procedure } from '@/types/medical-care-template';

const useMedicalCareTemplateAll = ({ client }: { client: TypedSupabaseClient }) => {
  const queryKey = ['medical_care_templates', 'all'];
  const queryFn = async () => {
    return selectMedicalCareTemplates(client).then((res) => {
      if (!res.data) return [];

      return res.data.map((item) => ({
        ...item,
        procedures: (item.procedures || []) as Procedure[],
      }));
    });
  };
  return { queryKey, queryFn };
};

export { useMedicalCareTemplateAll };
