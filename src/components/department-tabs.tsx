import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    <Tabs value={current} onValueChange={onChange}>
      <TabsList className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <TabsTrigger
            key={dept}
            value={dept}
            // className={cn(DepartmentBgColor(dept as Department))}
            className={cn('pb-2 border-2', DepartmentBorderColor(dept as Department))}
          >
            {/* {<DepartmentSpan department={dept as Department} />} */}
            {dept}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
