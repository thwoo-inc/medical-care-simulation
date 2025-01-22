import { Tables } from '@/lib/database.types';
import { MedicalCare } from '@/service/medical-care/type';
import { Procedure } from '@/types/procedure';

export const getMedicalCareSelector = (data: Tables<'medical_cares'>): MedicalCare => {
  return {
    ...data,
    procedures: data.procedures as Procedure[],
  };
};

export const getMedicalCaresSelector = (data: Tables<'medical_cares'>[]): MedicalCare[] => {
  return data.map((d) => ({
    ...d,
    procedures: d.procedures as Procedure[],
  }));
};
