'use client';

import Spinner from '@/components/spinner';
import TemplateCard from '@/components/template-card';
import { useGetMedicalCareTemplates } from '@/service/medical-care-template';
import { ClipboardList } from 'lucide-react';

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
        <>
          <h1 className="text-2xl my-8 font-bold flex items-center gap-2">
            <ClipboardList />
            テンプレート
          </h1>
          <ul className="w-full space-y-4">
            {tmpls.map((t) => (
              <li key={t.id}>
                <TemplateCard t={t} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
