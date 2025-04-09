'use client';

import { MedicalCareTemplateAddForm } from '@/components/medical-care-template-add-form';
import Spinner from '@/components/spinner';
import TemplateCard from '@/components/template-card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGetMedicalCareTemplates } from '@/service/medical-care-template';
import { ClipboardList, Plus } from 'lucide-react';

export default function Page() {
  const { data: tmpls, isPending, isError, error } = useGetMedicalCareTemplates();

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {isPending && <Spinner />}
      {isError && (
        <div>
          <p>エラーが発生しました。</p>
          <p className="text-red-500">{error?.message}</p>
        </div>
      )}
      {!isPending && !isError && tmpls && (
        <div className="flex flex-col items-center justify-center w-full relative space-y-8 p-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList />
            テンプレート
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-2 shadow border rounded flex items-center justify-center w-10 h-10">
                <Plus size="24" />
              </div>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle className="text-center">テンプレートの新規作成</DialogTitle>
              <MedicalCareTemplateAddForm />
            </DialogContent>
          </Dialog>
          <ul className="w-full space-y-4">
            {tmpls.map((t) => (
              <li key={t.id}>
                <TemplateCard t={t} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
