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
