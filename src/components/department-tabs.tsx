import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DepartmentALL, departmentOrders } from '@/types/department';
import { cn } from '@/lib/utils';
import { Procedure } from '@/types/procedure';

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
  // DepartmentALLを先頭に追加
  availableDepartments.unshift(DepartmentALL);

  return (
    <Tabs value={current} onValueChange={onChange}>
      <TabsList className="flex flex-wrap gap-2">
        {availableDepartments.map((dept) => (
          <TabsTrigger
            key={dept}
            value={dept}
            className={cn(current === dept ? 'bg-primary text-primary-foreground' : '')}
          >
            {dept === '助産師/看護師' ? 'スタッフ' : dept}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
