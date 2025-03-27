import { cn } from '@/lib/utils';
import {
  Department,
  DepartmentAMEC3,
  DepartmentAnesthesiology,
  DepartmentCardiology,
  DepartmentICU,
  DepartmentNICU,
  DepartmentObstetrics,
  DepartmentStaff,
} from '@/types/procedure';
import React from 'react';

export function DepartmentBgColor(department: Department) {
  switch (department) {
    case DepartmentObstetrics:
      return 'bg-dept-obstertrics-p';
    case DepartmentStaff:
      return 'bg-dept-staff-p';
    case DepartmentNICU:
      return 'bg-dept-nicu-p';
    case DepartmentAnesthesiology:
      return 'bg-dept-anesthesiology-p';
    case DepartmentCardiology:
      return 'bg-dept-cardiology-p';
    case DepartmentICU:
      return 'bg-dept-icu-p';
    case DepartmentAMEC3:
      return 'bg-dept-amec3-p';
    default:
      return 'bg-muted';
  }
}

export function DepartmentBorderColor(department: Department) {
  switch (department) {
    case DepartmentObstetrics:
      return 'border-dept-obstertrics-p';
    case DepartmentStaff:
      return 'border-dept-staff-p';
    case DepartmentNICU:
      return 'border-dept-nicu-p';
    case DepartmentAnesthesiology:
      return 'border-dept-anesthesiology-p';
    case DepartmentCardiology:
      return 'border-dept-cardiology-p';
    case DepartmentICU:
      return 'border-dept-icu-p';
    case DepartmentAMEC3:
      return 'border-dept-amec3-p';
    default:
      return 'border-muted';
  }
}

export function DepartmentSpan({ department }: { department: Department }) {
  const common = 'p-1 rounded';
  switch (department) {
    case DepartmentObstetrics:
      return <span className={cn('bg-dept-obstertrics-p', common)}>{department}</span>;
    case DepartmentStaff:
      return <span className={cn('bg-dept-staff-p', common)}>{department}</span>;
    case DepartmentNICU:
      return <span className={cn('bg-dept-nicu-p', common)}>{department}</span>;
    case DepartmentAnesthesiology:
      return <span className={cn('bg-dept-anesthesiology-p', common)}>{department}</span>;
    case DepartmentCardiology:
      return <span className={cn('bg-dept-cardiology-p', common)}>{department}</span>;
    case DepartmentICU:
      return <span className={cn('bg-dept-icu-p', common)}>{department}</span>;
    case DepartmentAMEC3:
      return <span className={cn('bg-dept-amec3-p', common)}>{department}</span>;
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
    case DepartmentStaff:
      return <p className={cn('bg-dept-staff-p', common, className)}>{department}</p>;
    case DepartmentNICU:
      return <p className={cn('bg-dept-nicu-p', common, className)}>{department}</p>;
    case DepartmentAnesthesiology:
      return <p className={cn('bg-dept-anesthesiology-p', common, className)}>{department}</p>;
    case DepartmentCardiology:
      return <p className={cn('bg-dept-cardiology-p', common, className)}>{department}</p>;
    case DepartmentICU:
      return <p className={cn('bg-dept-icu-p', common, className)}>{department}</p>;
    case DepartmentAMEC3:
      return <p className={cn('bg-dept-amec3-p', common, className)}>{department}</p>;
    default:
      return <p className={cn('bg-muted', common, className)}>{department}</p>;
  }
}
