import { Database } from '@/lib/database.types';
import { Procedure } from '@/types/procedure';

type SupabaseMedicalcareTemplate = Database['public']['Tables']['medical_care_templates']['Row'];

export type MedicalCareTemplate = Omit<SupabaseMedicalcareTemplate, 'procedures'> & {
  procedures: Procedure[];
};
