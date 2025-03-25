'use client';

import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { durationTimeFormatMS } from '@/lib/date';
import { cn } from '@/lib/utils';
import { MedicalCare } from '@/service/medical-care/type';
import { Procedure } from '@/types/procedure';
import { Check, Play, Undo2 } from 'lucide-react';
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
    if (!proc.started_at || proc.has_start_only) return;

    const updateElapsedTime = () => {
      const formatted = durationTimeFormatMS(
        new Date(proc.started_at!),
        proc.finished_at ? new Date(proc.finished_at) : new Date(),
      );
      setElapsedTime(formatted);
    };

    // 必ず初回実行
    updateElapsedTime();
    // 終了してなければ1秒ごとに更新
    if (!care.finished_at && !proc.finished_at) {
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [proc.started_at, proc.finished_at, proc.has_start_only, care.finished_at]);

  const isWill = !proc.started_at;
  const isDoing = proc.started_at && !proc.has_start_only && !proc.finished_at;
  const isDone = (proc.started_at && proc.has_start_only) || proc.finished_at;

  return (
    <div
      key={proc.label}
      className={cn(
        'p-2 space-y-2 border-2 rounded w-full',
        isWill ? 'bg-state-will' : isDoing ? 'bg-state-doing' : 'bg-state-done',
      )}
    >
      {/* ラベル */}
      <p className="">{proc.label}</p>

      {/* 治療も完了後は完了時間、処置のみ開始後は経過時間、開始前は詳細*/}
      <div className="text-sm">
        {isWill && <p>{proc.details}</p>}
        {(isDoing || isDone) && (
          <p className="text-right">
            {`${durationTimeFormatMS(
              new Date(care.started_at || ''),
              new Date(proc.started_at || ''),
            )} ${proc.has_start_only ? '実施' : '開始'}`}
            {!proc.has_start_only && (isDoing || isDone) && (
              <span className="ml-1">{`(${elapsedTime}${isDoing ? '経過' : 'で終了'})`}</span>
            )}
          </p>
        )}
      </div>

      {!care.finished_at && (
        <div className="flex justify-between">
          <Button
            variant="outline"
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
            {updating ? (
              <Spinner />
            ) : (
              <>
                戻す
                <Undo2 />
              </>
            )}
          </Button>
          <Button
            className={cn(
              (proc.finished_at || (proc.has_start_only && proc.started_at)) && 'invisible',
            )}
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
            {updating ? (
              <Spinner />
            ) : !proc.started_at ? (
              proc.has_start_only ? (
                <>
                  実施
                  <Check />
                </>
              ) : (
                <>
                  開始
                  <Play />
                </>
              )
            ) : (
              !proc.has_start_only && (
                <>
                  終了
                  <Check />
                </>
              )
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
