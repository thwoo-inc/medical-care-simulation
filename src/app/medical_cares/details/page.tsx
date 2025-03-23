'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import MedicalCareHeader from '@/components/medical-care-header';
import { useGetMedicalCare } from '@/service/medical-care';
import { ReportTabs } from '@/components/report-tabs';
import { ReportDepartment, ReportTimeline } from '@/types/report';
import Spinner from '@/components/spinner';
import ProdedureDepartment from '@/components/procedure-department';
import ProcedureTimeline from '@/components/procedure-timeline';

function MedicalCareContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: care, isPending, isError } = useGetMedicalCare(id || '');

  const [selectReport, setSelectReport] = useState(
    care?.finished_at ? ReportTimeline : ReportDepartment,
  );

  return (
    <>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && care && (
        <div className="relative overflow-x-clip">
          <div className="sticky overflow-x-hidden bg-white top-0 z-0 px-4 sm:pl-16 py-4 space-y-4 shadow-md">
            <MedicalCareHeader care={care} />
            <ReportTabs current={selectReport} onChange={setSelectReport} />
          </div>

          <section className="p-4">
            {selectReport === ReportDepartment && <ProdedureDepartment care={care} />}
            {selectReport === ReportTimeline && <ProcedureTimeline care={care} />}
          </section>
        </div>
      )}
    </>
  );
}

// ページコンポーネント
export default function MedicalCarePage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MedicalCareContent />
    </Suspense>
  );
}
