import { TablesUpdate } from '@/lib/database.types';
import { TypedSupabaseClient } from '@/lib/supabase';

export function updateMedicalCare(
  client: TypedSupabaseClient,
  id: string,
  updates: Partial<TablesUpdate<'medical_cares'>>,
) {
  if (!updates || Object.keys(updates).length === 0) {
    throw new Error('medical_care is required');
  }

  return client.from('medical_cares').update(updates).eq('id', id).throwOnError();
}
