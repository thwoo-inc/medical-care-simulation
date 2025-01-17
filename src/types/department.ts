export const DepartmentObstetrics = '産科';
export const DepartmentNICU = 'NICU';
export const DepartmentAnesthesiology = '麻酔科';
export const DepartmentICU = 'ICU';
export const DepartmentAMEC3 = 'AMEC3';
export const DepartmentCardiology = '循環器内科ME';
export const DepartmentStaff = '助産師/看護師';

export type Department =
  | typeof DepartmentObstetrics
  | typeof DepartmentNICU
  | typeof DepartmentAnesthesiology
  | typeof DepartmentICU
  | typeof DepartmentAMEC3
  | typeof DepartmentCardiology;

export const departmentOrders = [
  DepartmentObstetrics,
  DepartmentAnesthesiology,
  DepartmentNICU,
  DepartmentICU,
  DepartmentAMEC3,
  DepartmentCardiology,
  DepartmentStaff,
];
