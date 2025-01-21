'use client';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { durationTimeFormat } from '@/lib/date';
import { cn } from '@/lib/utils';
import { MedicalCare } from '@/service/medical-care/type';
import { Procedure } from '@/types/medical-care-template';
import { useEffect, useState } from 'react';

type ProcedureItemProps = {
  care: MedicalCare;
  proc: Procedure;
  onUpdate: (proc: Procedure) => void;
};

export default function ProcedureItem({ care, proc, onUpdate }: ProcedureItemProps) {
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  // 経過時間を計算して更新する
  useEffect(() => {
    if (!proc.started_at) return;

    const updateElapsedTime = () => {
      const formatted = durationTimeFormat(
        new Date(proc.started_at!),
        proc.finished_at ? new Date(proc.finished_at) : new Date(),
      );
      setElapsedTime(formatted);
    };

    // 必ず初回実行
    updateElapsedTime();
    // 終了してなければ1秒ごとに更新
    if (!proc.finished_at) {
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [proc?.started_at, proc?.finished_at]);

  return (
    <div
      key={proc.label}
      className={cn(
        'px-4 flex gap-4 items-center justify-between py-2 border border-primary rounded-lg',
        !proc.started_at ? 'bg-white' : !proc.finished_at ? 'bg-red-100' : 'bg-gray-100',
      )}
    >
      <div className="">
        <p className="text-lg">{proc.label}</p>
        {!care.finished_at && !proc.finished_at && <p className="text-sm">{proc.details}</p>}
      </div>
      {!care.finished_at && (
        <div className="flex flex-col items-end">
          {proc.started_at && (
            <p>
              {elapsedTime} {!proc.finished_at ? '経過' : '完了'}
            </p>
          )}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className={cn(!proc.started_at && 'invisible')}
              onClick={async () => {
                setUpdating(true);
                await onUpdate(
                  Object.assign(
                    {},
                    proc,
                    !proc.finished_at ? { started_at: null } : { finished_at: null },
                  ),
                );
                setUpdating(false);
              }}
            >
              {updating ? <Spinner /> : '戻す'}
            </Button>
            <Button
              className={cn(proc.finished_at && 'invisible')}
              onClick={async () => {
                setUpdating(true);
                await onUpdate(
                  Object.assign(
                    {},
                    proc,
                    !proc.started_at ? { started_at: new Date() } : { finished_at: new Date() },
                  ),
                );
                setUpdating(false);
              }}
            >
              {updating ? <Spinner /> : !proc.started_at ? '開始' : '完了'}
            </Button>
          </div>
        </div>
      )}
      {care.finished_at && (
        <div className="flex flex-col">
          {care.started_at && proc.started_at && (
            <p className="text-sm">
              {durationTimeFormat(new Date(care.started_at), new Date(proc.started_at))} 後に開始
            </p>
          )}
          {care.started_at && proc.finished_at && (
            <p className="text-sm">
              {durationTimeFormat(new Date(care.started_at), new Date(proc.finished_at))} 後に完了
            </p>
          )}
          {/* {care.started_at && <p className="text-sm">3分2秒 後に開始</p>}
                              {care.started_at && <p className="text-sm">3分51秒 後に完了</p>} */}
        </div>
      )}
    </div>
  );
}
