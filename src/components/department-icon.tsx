import { deptBgColor } from '@/lib/color';
import { cn } from '@/lib/utils';
import { Department } from '@/types/department';
import React from 'react';

export default function DepartmentIcon({ department }: { department: Department }) {
  return <p className={cn('px-4 py-2 rounded', deptBgColor[department])}>{department}</p>;
}
