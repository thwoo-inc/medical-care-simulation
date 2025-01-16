import { TypedSupabaseClient } from '@/lib/supabase';
import { getMedicalCare } from '@/queries/select-medical-cares';

const useMedicalCareById = ({ client, id }: { client: TypedSupabaseClient; id: string }) => {
  const queryKey = ['medical_cares', id];
  const queryFn = async () => {
    return getMedicalCare(client, id).then((res) => res.data);
  };
  return { queryKey, queryFn };
};

export { useMedicalCareById };
