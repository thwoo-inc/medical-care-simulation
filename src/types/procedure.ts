export const procedureSteps = Array.from({ length: 5 }, (_, i) => i + 1);

export const DepartmentObstetrics = '産科';
export const DepartmentStaff = 'スタッフ';
export const DepartmentNICU = 'NICU';
export const DepartmentAnesthesiology = '麻酔科';
export const DepartmentCardiology = '循環器内科ME';
export const DepartmentICU = 'ICU';
export const DepartmentAMEC3 = 'AMEC3';

export type Department =
  | typeof DepartmentObstetrics
  | typeof DepartmentStaff
  | typeof DepartmentNICU
  | typeof DepartmentAnesthesiology
  | typeof DepartmentCardiology
  | typeof DepartmentICU
  | typeof DepartmentAMEC3;

export const departmentOrders = [
  DepartmentObstetrics,
  DepartmentStaff,
  DepartmentNICU,
  DepartmentAnesthesiology,
  DepartmentCardiology,
  DepartmentICU,
  DepartmentAMEC3,
];

export const RecordTypeDone = 'done';
export const RecordTypeStartFinish = 'start_finish';

export type RecordType = typeof RecordTypeDone | typeof RecordTypeStartFinish;

export type Procedure = {
  id: string;
  department: Department;
  step: number;
  step_order: number;
  label: string;
  details: string;
  done_at?: string;
  started_at?: string;
  finished_at?: string;
  record_type?: RecordType;
};

// 'abcdefghijklmnopqrstuvwxyz0123456789'から8桁のランダムな文字列を生成する
export function generateId(): string {
  return Array.from({ length: 8 })
    .map(() => 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)])
    .join('');
}

// Procedureをソートするユーティリティ関数
export function sortProcedures(procedures: Procedure[]): Procedure[] {
  return procedures.sort((a, b) =>
    a.step !== b.step ? a.step - b.step : a.step_order - b.step_order,
  );
}

// recordTypeの表記
export const recordTypeLabel = (recordType: RecordType) =>
  recordType === RecordTypeDone ? '実施' : '開始/終了';
