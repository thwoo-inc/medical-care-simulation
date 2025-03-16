import { Department } from '@/types/department';

export type Procedure = {
  department: Department;
  phase: string;
  label: string;
  details: string;
  started_at?: string;
  finished_at?: string;
  hasStartOnly?: boolean; // 開始のみをもつ＝実行したかどうかだけの記録とみなす
};
