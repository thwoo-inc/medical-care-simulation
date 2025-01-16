import { TablesInsert } from '@/lib/database.types';
import { TypedSupabaseClient } from '@/lib/supabase';

export function insertMedicalCare(
  client: TypedSupabaseClient,
  medicalCare: TablesInsert<'medical_cares'>,
) {
  if (!medicalCare) {
    throw new Error('medical_care is required');
  }

  return client.from('medical_cares').insert(medicalCare).throwOnError();
}
