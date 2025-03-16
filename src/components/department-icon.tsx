import { cn } from '@/lib/utils';
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
import React from 'react';

export function DepartmentSpan({ department }: { department: Department }) {
  const common = 'p-1 rounded';
  switch (department) {
    case DepartmentObstetrics:
      return <span className={cn('bg-dept-obstertrics-p', common)}>{department}</span>;
    case DepartmentNICU:
      return <span className={cn('bg-dept-nicu-p', common)}>{department}</span>;
    case DepartmentAnesthesiology:
      return <span className={cn('bg-dept-anesthesiology-p', common)}>{department}</span>;
    case DepartmentICU:
      return <span className={cn('bg-dept-icu-p', common)}>{department}</span>;
    case DepartmentAMEC3:
      return <span className={cn('bg-dept-amec3-p', common)}>{department}</span>;
    case DepartmentCardiology:
      return <span className={cn('bg-dept-cardiology-p', common)}>{department}</span>;
    case DepartmentStaff:
      return <span className={cn('bg-dept-staff-p', common)}>{department}</span>;
    case DepartmentEmergency:
      return <span className={cn('bg-dept-emergency-p', common)}>{department}</span>;
    default:
      return <span className={cn('bg-muted', common)}>{department}</span>;
  }
}

export function DepartmentParagraph({
  department,
  className,
}: {
  department: Department;
  className?: string;
}) {
  const common = 'px-2 py-1 rounded';
  switch (department) {
    case DepartmentObstetrics:
      return <p className={cn('bg-dept-obstertrics-p', common, className)}>{department}</p>;
    case DepartmentNICU:
      return <p className={cn('bg-dept-nicu-p', common, className)}>{department}</p>;
    case DepartmentAnesthesiology:
      return <p className={cn('bg-dept-anesthesiology-p', common, className)}>{department}</p>;
    case DepartmentICU:
      return <p className={cn('bg-dept-icu-p', common, className)}>{department}</p>;
    case DepartmentAMEC3:
      return <p className={cn('bg-dept-amec3-p', common, className)}>{department}</p>;
    case DepartmentCardiology:
      return <p className={cn('bg-dept-cardiology-p', common, className)}>{department}</p>;
    case DepartmentStaff:
      return <p className={cn('bg-dept-staff-p', common, className)}>{department}</p>;
    case DepartmentEmergency:
      return <p className={cn('bg-dept-emergency-p', common, className)}>{department}</p>;
    default:
      return <p className={cn('bg-muted', common, className)}>{department}</p>;
  }
}
