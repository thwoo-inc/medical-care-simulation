import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Department, departmentOrders } from '@/types/department';
import { Procedure } from '@/types/procedure';
import { DepartmentSpan } from '@/components/department-icon';

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
          <TabsTrigger key={dept} value={dept}>
            {<DepartmentSpan department={dept as Department} />}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
