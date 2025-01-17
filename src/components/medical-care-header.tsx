'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { durationTimeFormat } from '@/lib/date';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { deleteMedicalCare } from '@/queries/delete-medical-care';
import { updateMedicalCare } from '@/queries/update-medical-care';
import { MedicalCare } from '@/types/medical-care';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MedicalCareHeader({ care }: { care: MedicalCare }) {
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isFinishDialogOpen, setIsFinishDialogOpen] = useState(false);
  const router = useRouter();

  // 経過時間を計算して更新する
  useEffect(() => {
    if (!care?.started_at || care.finished_at) return;

    const updateElapsedTime = () => {
      const formatted = durationTimeFormat(new Date(care.started_at!), new Date());
      setElapsedTime(formatted);
    };

    // 初回実行
    updateElapsedTime();
    // 1秒ごとに更新
    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId);
  }, [care?.started_at, care?.finished_at]);

  // 取りやめ処理
  const handleCancel = async () => {
    try {
      const result = await deleteMedicalCare(supabase, care.id);
      if (result.error) {
        console.error(`deleteMedicalCare failed: ${result.error}`);
        return;
      }
      console.log('deleteMedicalCare success');
      router.push('/');
    } catch (error) {
      console.error(`deleteMedicalCare catch: ${error}`);
    }
  };

  // 終了処理
  const handleFinish = async () => {
    try {
      const result = await updateMedicalCare(supabase, care.id, {
        finished_at: new Date().toISOString(),
      });
      if (result.error) {
        console.error(`updateMedicalCare failed: ${result.error}`);
        return;
      }
      console.log('updateMedicalCare success');
      router.push('/medical_cares');
    } catch (error) {
      console.error(`updateMedicalCare catch: ${error}`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <Card className={cn('p-4', care.finished_at ? 'bg-muted' : 'bg-red-100')}>
        <h1 className={cn('text-lg')}>{care.label}</h1>
      </Card>

      <div className="flex justify-between items-center w-full">
        <Button variant={'outline'} onClick={() => setIsCancelDialogOpen(true)}>
          {care.finished_at ? '治療の削除' : '治療の取りやめ'}
        </Button>
        <div className="flex flex-col items-center gap-2">
          <p className="text-muted-foreground">
            {new Date(care.started_at!).toLocaleString()} 治療開始
          </p>
          {care.finished_at && (
            <p className="text-black text-xl font-bold">
              {durationTimeFormat(new Date(care.started_at!), new Date(care.finished_at))} 完了
            </p>
          )}
          {!care.finished_at && (
            <p className="text-red-600 text-xl font-bold">{elapsedTime} 経過</p>
          )}
        </div>
        <div>
          <Button
            onClick={() => setIsFinishDialogOpen(true)}
            className={cn(care.finished_at && 'invisible')}
          >
            治療の完了
          </Button>
        </div>
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
            <Button variant="destructive" onClick={handleCancel}>
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
            <Button variant="destructive" onClick={handleFinish}>
              完了して終了する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
