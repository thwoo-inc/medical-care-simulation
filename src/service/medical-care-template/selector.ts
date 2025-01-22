import { Tables } from '@/lib/database.types';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { Procedure } from '@/types/procedure';

// export const getMedicalCareTemplateSelector = (data: Tables<'medical_care_templates'>): MedicalCare => {
//   return {
//     ...data,
//     procedures: data.procedures as Procedure[],
//   };
// };

export const getMedicalCareTemplatesSelector = (
  data: Tables<'medical_care_templates'>[],
): MedicalCareTemplate[] => {
  return data.map((d) => ({
    ...d,
    procedures: d.procedures as Procedure[],
  }));
};
