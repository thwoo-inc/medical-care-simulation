'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TablesUpdate } from '@/lib/database.types';
import { durationTimeFormatMS } from '@/lib/date';
import { cn } from '@/lib/utils';
import { useDeleteMedicalCare, useUpdateMedicalCare } from '@/service/medical-care';
import { MedicalCare } from '@/service/medical-care/type';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function MedicalCareHeader({ care }: { care: MedicalCare }) {
  const router = useRouter();

  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);

  const { mutate: mutateUpdate } = useUpdateMedicalCare();
  const { mutate: mutateDelete } = useDeleteMedicalCare();

  // 経過時間を計算して更新する
  useEffect(() => {
    if (!care?.started_at) return;

    const updateElapsedTime = () => {
      const formatted = durationTimeFormatMS(
        new Date(care.started_at!),
        care.finished_at ? new Date(care.finished_at) : new Date(),
      );
      setElapsedTime(formatted);
    };

    // 必ず初回実行
    updateElapsedTime();
    // 終了してなければ1秒ごとに更新
    if (!care.finished_at) {
      const intervalId = setInterval(updateElapsedTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [care?.started_at, care?.finished_at]);

  // 医療の更新
  const handleFinished = async () => {
    const updates: TablesUpdate<'medical_cares'> = {
      finished_at: new Date().toISOString(),
    };
    mutateUpdate({ id: care.id, updates });
    toast.success('医療記録を終了しました');
    router.push(`/medical_cares/`);
  };

  // 医療の削除
  const handleDelete = async () => {
    await mutateDelete({ id: care.id });
    toast.success('医療記録を削除しました');
    router.push(`/`);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[480px] space-y-4 w-full">
      <div
        className={cn(
          'p-4 w-full rounded-lg',
          care.finished_at ? 'bg-state-done' : 'bg-state-doing',
        )}
      >
        <h1 className={cn('text-lg text-center font-bold')}>{care.label}</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full max-w-[480px]">
        <Button variant={'outline'} onClick={() => setIsCancelDialogOpen(true)}>
          {care.finished_at ? '治療の削除' : '治療の取りやめ'}
        </Button>
        <p className="text-muted-foreground">{new Date(care.started_at!).toLocaleString()} 開始</p>
        <Button
          onClick={() => setIsFinishDialogOpen(true)}
          className={cn(care.finished_at && 'invisible')}
        >
          治療の完了
        </Button>
      </div>
      <div className="flex justify-center">
        {!care.finished_at ? (
          <p className="text-red-600 font-bold">
            <span className="text-xl">{elapsedTime}</span> 経過
          </p>
        ) : (
          <p className="text-black text-xl font-bold">
            {durationTimeFormatMS(new Date(care.started_at!), new Date(care.finished_at))} 完了
          </p>
        )}
      </div>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{care.finished_at ? '治療の削除' : '治療の取りやめ'}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              {care.finished_at ? '記録を残したままにする' : 'このまま続ける'}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {care.finished_at ? '記録を削除する' : '取りやめて削除する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFinishDialogOpen} onOpenChange={setIsFinishDialogOpen}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>治療の完了</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFinishDialogOpen(false)}>
              このまま続ける
            </Button>
            <Button onClick={handleFinished}>完了して終了する</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
