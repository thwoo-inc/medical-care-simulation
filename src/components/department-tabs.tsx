import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Procedure } from '@/types/medical-care-template'; // Procedureの型定義は既存のものを使用すると仮定
import { departmentOrders } from '@/types/department';
import { cn } from '@/lib/utils';

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
          <TabsTrigger
            key={dept}
            value={dept}
            className={cn(current === dept ? 'bg-primary text-primary-foreground' : '')}
          >
            {dept}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
