import { Procedure } from '@/types/procedure';
import { Database } from '@/lib/database.types';

type SupabaseMedicalCare = Database['public']['Tables']['medical_cares']['Row'];

export type MedicalCare = Omit<SupabaseMedicalCare, 'procedures'> & {
  procedures: Procedure[];
};
