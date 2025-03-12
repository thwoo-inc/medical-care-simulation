import {
  Department,
  DepartmentAMEC3,
  DepartmentAnesthesiology,
  DepartmentCardiology,
  DepartmentEmergency,
  DepartmentICU,
  DepartmentNICU,
  DepartmentObstetrics,
  DepartmentStaff,
} from '@/types/department';

// Departmentのtypeをキーにした背景色の文字列のマップ
export const deptBgColor: Record<Department, string> = {
  [DepartmentObstetrics]: 'bg-dept-obstertrics-p/50 data-[state=active]:bg-dept-obstertrics-p',
  [DepartmentNICU]: 'bg-dept-nicu-p/50 data-[state=active]:bg-dept-nicu-p',
  [DepartmentAnesthesiology]:
    'bg-dept-anesthesiology-p/50 data-[state=active]:bg-dept-anesthesiology-p',
  [DepartmentICU]: 'bg-dept-icu-p/50 data-[state=active]:bg-dept-icu-p',
  [DepartmentAMEC3]: 'bg-dept-amec3-p/50 data-[state=active]:bg-dept-amec3-p',
  [DepartmentCardiology]: 'bg-dept-cardiology-p/50 data-[state=active]:bg-dept-cardiology-p',
  [DepartmentStaff]: 'bg-dept-staff-p/50 data-[state=active]:bg-dept-staff-p',
  [DepartmentEmergency]: 'bg-dept-emergency-p/50 data-[state=active]:bg-dept-emergency-p',
};
