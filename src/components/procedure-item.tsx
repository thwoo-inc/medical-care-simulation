'use client';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { durationTimeFormat } from '@/lib/date';
import { cn } from '@/lib/utils';
import { MedicalCare } from '@/service/medical-care/type';
import { Procedure } from '@/types/procedure';
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

  const isWill = !proc.started_at;
  const isDoing = proc.started_at && !proc.finished_at;
  const isDone = proc.finished_at;
  // const isCareDone = care.finished_at;

  return (
    <div
      key={proc.label}
      className={cn(
        'p-2 space-y-2 border border-primary rounded w-[240px]',
        isWill ? 'bg-state-will' : isDoing ? 'bg-state-doing' : 'bg-state-done',
      )}
    >
      {/* ラベル */}
      <p className="">{proc.label}</p>

      {/* 治療も完了後は完了時間、処置のみ開始後は経過時間、開始前は詳細*/}
      <div className="text-sm">
        {isWill && <p>{proc.details}</p>}
        {(isDoing || isDone) && (
          <p className="text-right">{`治療${durationTimeFormat(
            new Date(care.started_at || ''),
            new Date(proc.started_at || ''),
          )} に開始`}</p>
        )}
        {(isDoing || isDone) && (
          <p className="text-right">
            {elapsedTime} {isDoing ? '経過' : '完了'}
          </p>
        )}
      </div>

      {!care.finished_at && (
        <div className="flex justify-between">
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
      )}
    </div>
  );
}
