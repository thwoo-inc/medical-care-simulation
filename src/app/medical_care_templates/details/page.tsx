'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Spinner from '@/components/spinner';
import { useGetMedicalCareTemplate } from '@/service/medical-care-template';
import MedicalCareTemplateHeader from '@/components/medical-care-template-header';
import ProdedureEditMap from '@/components/procedure-edit-map';

function MedicalCareTemplatePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: template, isPending, isError } = useGetMedicalCareTemplate(id || '');

  return (
    <>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && template && (
        <div className="relative overflow-x-clip">
          <div className="sticky overflow-x-hidden bg-white top-0 z-0 px-4 sm:pl-16 py-4 space-y-4 shadow-md">
            <MedicalCareTemplateHeader template={template} />
          </div>

          <section className="p-4">
            <ProdedureEditMap template={template} />
          </section>
        </div>
      )}
    </>
  );
}

// ページコンポーネント
export default function Page() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MedicalCareTemplatePage />
    </Suspense>
  );
}
