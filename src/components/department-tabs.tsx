import { Department, departmentOrders } from '@/types/procedure';
import { Procedure } from '@/types/procedure';
import { DepartmentBorderColor } from '@/components/department-icon';
import { cn } from '@/lib/utils';

type DepartmentTabsProps = {
  procedures: Procedure[];
  current: string;
  onChange: (department: string) => void;
  isAllDepartment?: boolean;
};

export function DepartmentTabs({
  procedures,
  current,
  onChange,
  isAllDepartment,
}: DepartmentTabsProps) {
  const departments = isAllDepartment
    ? departmentOrders
    : departmentOrders.filter((dept) => procedures.some((proc) => proc.department === dept));
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 rounded-md text-sm p-1 border-4',
        current === '' ? 'border-dept-all-p' : 'border-muted',
      )}
    >
      {departments.map((dept) => (
        <button
          key={dept}
          className={cn(
            'px-4 py-2 border-4',
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
