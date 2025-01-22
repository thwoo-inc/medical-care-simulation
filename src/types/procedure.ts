import { Department } from '@/types/department';

export type Procedure = {
  department: Department;
  phase: string;
  label: string;
  details: string;
  started_at?: string;
  finished_at?: string;
};
