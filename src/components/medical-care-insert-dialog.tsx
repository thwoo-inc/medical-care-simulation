import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MedicalCareInsertForm } from './medical-care-insert-form';

export function MedicalCareDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle className="text-center">新規シミュレーション</DialogTitle>
        <DialogDescription className="text-center">
          テンプレートを選択して開始してください
        </DialogDescription>
        <MedicalCareInsertForm />
      </DialogContent>
    </Dialog>
  );
}
