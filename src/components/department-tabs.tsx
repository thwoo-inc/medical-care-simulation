import { Department, departmentOrders } from '@/types/department';
import { Procedure } from '@/types/procedure';
import { DepartmentBorderColor } from '@/components/department-icon';
import { cn } from '@/lib/utils';

type DepartmentTabsProps = {
  procedures: Procedure[];
  current: string;
  onChange: (department: string) => void;
};

export function DepartmentTabs({ procedures, current, onChange }: DepartmentTabsProps) {
  // proceduresに存在する診療科のみをフィルタリング
  const departments = departmentOrders.filter((dept) =>
    procedures.some((proc) => proc.department === dept),
  );

  return (
    <div className="flex flex-wrap gap-2 rounded-md text-sm">
      {departments.map((dept) => (
        <button
          key={dept}
          className={cn(
            'px-4 py-2 border-b-4',
            current === dept && DepartmentBorderColor(dept as Department),
            current === dept && 'bg-white',
          )}
          onClick={() => (current === dept ? onChange('') : onChange(dept))}
        >
          {dept}
        </button>
      ))}
    </div>
  );
}
