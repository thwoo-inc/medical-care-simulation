import { DepartmentSpan } from '@/components/department-icon';
import { Department, departmentOrders } from '@/types/procedure';
import { Procedure } from '@/types/procedure';
import React, { useMemo } from 'react';

export default function DepartmentCount({
  procedures,
  isShowZero,
}: {
  procedures: Procedure[];
  isShowZero?: boolean;
}) {
  const departmentCounts = useMemo(() => {
    return departmentOrders.reduce((acc, dept) => {
      const count = procedures.filter((p) => p.department === dept).length;
      if (isShowZero || count > 0) {
        acc[dept] = count;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [isShowZero, procedures]);

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {Object.entries(departmentCounts).map(([dept, count]) => (
        <p key={dept} className="flex items-center gap-1 text-sm">
          {<DepartmentSpan department={dept as Department} />}
          <span>{count}件</span>
        </p>
      ))}
    </div>
  );
}
