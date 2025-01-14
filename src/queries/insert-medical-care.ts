import { TablesInsert } from '@/utils/database.types';
import { TypedSupabaseClient } from '@/utils/supabase';

export function insertMedicalcareTreatments(
  client: TypedSupabaseClient,
  medicalCare: TablesInsert<'medical_cares'>,
) {
  if (!medicalCare) {
    throw new Error('medical_care is required');
  }

  return client.from('medical_cares').insert(medicalCare).throwOnError();
}
