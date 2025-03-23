import { TablesInsert, TablesUpdate } from '@/lib/database.types';
import { supabase } from '@/lib/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export const getMedicalCareTemplates = async () => {
  return supabase.from('medical_care_templates').select('*').throwOnError();
};

export const createMedicalCareTemplate = async (care: TablesInsert<'medical_care_templates'>) => {
  return supabase.from('medical_care_templates').insert(care).throwOnError();
};

export const updateMedicalCareTemplate = async (
  id: string,
  updates: Partial<TablesUpdate<'medical_care_templates'>>,
): Promise<PostgrestSingleResponse<null>> => {
  return supabase.from('medical_care_templates').update(updates).eq('id', id).throwOnError();
};

export function deleteMedicalCareTemplate(id: string) {
  return supabase.from('medical_care_templates').delete().eq('id', id).throwOnError();
}
