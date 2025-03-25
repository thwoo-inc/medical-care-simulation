import { Department } from '@/types/department';

export const procedureSteps = Array.from({ length: 5 }, (_, i) => i + 1);

export type Procedure = {
  department: Department;
  step: number;
  step_order: number;
  label: string;
  details: string;
  started_at?: string;
  finished_at?: string;
  has_start_only?: boolean; // 開始のみをもつ＝実行したかどうかだけの記録とみなす
};
