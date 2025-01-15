'use client';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MedicalCareInsertForm } from './medical-care-insert-form';

export function MedicalCareDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>医療シミュレーション作成</DialogTitle>
        <MedicalCareInsertForm />
      </DialogContent>
    </Dialog>
  );
}
