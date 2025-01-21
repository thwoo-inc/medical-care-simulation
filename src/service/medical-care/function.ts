import { Tables, TablesInsert, TablesUpdate } from '@/lib/database.types';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getMedicalCaresInProgress = async () => {
  return supabase
    .from('medical_cares')
    .select('*')
    .is('finished_at', null)
    .order('started_at', { ascending: false })
    .throwOnError();
};

export const getMedicalCaresFinished = async () => {
  return supabase
    .from('medical_cares')
    .select('*')
    .not('finished_at', 'is', null)
    .order('started_at', { ascending: false })
    .throwOnError();
};

export const getMedicalCare = async (
  id: string,
): Promise<PostgrestSingleResponse<Tables<'medical_cares'>>> => {
  return supabase.from('medical_cares').select('*').eq('id', id).single().throwOnError();
};

export const createMedicalCare = async (care: TablesInsert<'medical_cares'>) => {
  return supabase.from('medical_cares').insert(care).throwOnError();
};

export const updateMedicalCare = async (
  id: string,
  updates: Partial<TablesUpdate<'medical_cares'>>,
): Promise<PostgrestSingleResponse<null>> => {
  return supabase.from('medical_cares').update(updates).eq('id', id).throwOnError();
};

export function deleteMedicalCare(id: string) {
  return supabase.from('medical_cares').delete().eq('id', id).throwOnError();
}
