import { TypedSupabaseClient } from '@/lib/supabase';

export function selectMedicalCareTemplates(client: TypedSupabaseClient) {
  return client.from('medical_care_templates').select('*').throwOnError();
}
