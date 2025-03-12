import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { reportOrders } from '@/types/report';
import { cn } from '@/lib/utils';

type ReportTabsProps = {
  current: string;
  onChange: (report: string) => void;
};

export function ReportTabs({ current, onChange }: ReportTabsProps) {
  return (
    <Tabs value={current} onValueChange={onChange} className="max-w-[480px]">
      <TabsList className="flex flex-wrap gap-2">
        {reportOrders.map((report) => (
          <TabsTrigger
            key={report}
            value={report}
            className={cn(current === report ? 'bg-primary text-primary-foreground' : '')}
          >
            {report}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
