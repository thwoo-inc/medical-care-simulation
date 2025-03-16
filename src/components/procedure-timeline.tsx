import { DepartmentParagraph } from '@/components/department-icon';
import { Button } from '@/components/ui/button';
import { durationTimeFormatMS } from '@/lib/date';
import { MedicalCare } from '@/service/medical-care/type';
import { toast } from 'sonner';

export default function ProcedureTimeline({ care }: { care: MedicalCare }) {
  const orderProcedures = care.procedures
    .filter((p) => !!p.started_at)
    .sort((a, b) => {
      const aDate = new Date(a.started_at as string);
      const bDate = new Date(b.started_at as string);
      return aDate.getTime() - bDate.getTime();
    });

  const handleCopyToClipboard = () => {
    const text = orderProcedures
      .map((p) => {
        const timeSinceStart = durationTimeFormatMS(
          new Date(care.started_at!),
          new Date(p.started_at!),
        );
        const duration = p.finished_at
          ? `${durationTimeFormatMS(new Date(p.started_at!), new Date(p.finished_at!))}で完了`
          : '';
        return `・${timeSinceStart} ${p.department} ${p.label} ${duration}`.trim();
      })
      .join('\n');

    navigator.clipboard.writeText(text);
    toast.info('時系列をクリップボードにコピーしました');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {care.finished_at && (
        <Button variant="secondary" onClick={handleCopyToClipboard} className="">
          時系列をテキストとしてコピー
        </Button>
      )}
      <ul className="flex flex-col gap-2 w-full mr-auto">
        {orderProcedures.map((p) => (
          <li
            key={`${p.department}_${p.label}`}
            className="flex items-center gap-4 justify-between"
          >
            <p className="w-20 text-right text-sm flex-0">
              {durationTimeFormatMS(new Date(care.started_at!), new Date(p.started_at!))}
            </p>
            <DepartmentParagraph department={p.department} className="font-bold" />
            <p className="flex-1">{p.label}</p>
            {p.finished_at && (
              <p>{durationTimeFormatMS(new Date(p.started_at!), new Date(p.finished_at!))}で完了</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
