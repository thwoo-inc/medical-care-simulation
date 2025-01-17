import { TypedSupabaseClient } from '@/lib/supabase';

export function deleteMedicalCare(client: TypedSupabaseClient, id: string) {
  return client.from('medical_cares').delete().eq('id', id).throwOnError();
}
