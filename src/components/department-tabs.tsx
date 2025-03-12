import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Department, departmentOrders } from '@/types/department';
import { cn } from '@/lib/utils';
import { Procedure } from '@/types/procedure';
import { deptBgColor } from '@/lib/color';

type DepartmentTabsProps = {
  procedures: Procedure[];
  current: string;
  onChange: (department: string) => void;
};

export function DepartmentTabs({ procedures, current, onChange }: DepartmentTabsProps) {
  // proceduresに存在する診療科のみをフィルタリング
  const availableDepartments = departmentOrders.filter((dept) =>
    procedures.some((proc) => proc.department === dept),
  );

  return (
    <Tabs value={current} onValueChange={onChange}>
      <TabsList className="flex flex-wrap gap-2">
        {availableDepartments.map((dept) => (
          <TabsTrigger key={dept} value={dept} className={cn(deptBgColor[dept as Department])}>
            {dept}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
