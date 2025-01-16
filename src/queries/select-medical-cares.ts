import { TypedSupabaseClient } from '@/lib/supabase';

// export function selectMedicalCares(client: TypedSupabaseClient) {
//   return client.from('medical_cares').select('*').throwOnError();
// }

export function selectMedicalCaresInProgress(client: TypedSupabaseClient) {
  return client.from('medical_cares').select('*').is('finished_at', null).throwOnError();
}

export function selectMedicalCaresFinished(client: TypedSupabaseClient) {
  return client.from('medical_cares').select('*').not('finished_at', 'is', null).throwOnError();
}

export function getMedicalCare(client: TypedSupabaseClient, id: string) {
  return client.from('medical_cares').select('*').eq('id', id).single().throwOnError();
}
