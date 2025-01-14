import { Department } from '@/types/department';
import { Database } from '@/utils/database.types';

type SupabaseMedicalcareTemplate = Database['public']['Tables']['medical_care_templates']['Row'];

export type Procedure = {
  department: Department;
  phase: string;
  label: string;
  details: string;
  started_at?: string;
  finished_at?: string;
};

export type MedicalcareTemplate = Omit<SupabaseMedicalcareTemplate, 'procedures'> & {
  procedures: Procedure[];
};
