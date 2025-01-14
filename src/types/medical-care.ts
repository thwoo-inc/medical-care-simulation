import { Procedure } from '@/types/medical-care-template';
import { Database } from '@/utils/database.types';

type SupabaseMedicalCare = Database['public']['Tables']['medical_cares']['Row'];

export type MedicalCare = Omit<SupabaseMedicalCare, 'procedures'> & {
  procedures: Procedure[];
};
