import { supabase } from '@/lib/supabase';

export const getMedicalCareTemplates = async () => {
  return supabase.from('medical_care_templates').select('*').throwOnError();
};
