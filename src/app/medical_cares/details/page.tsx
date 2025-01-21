'use client';

import { Procedure } from '@/types/medical-care-template';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import MedicalCareHeader from '@/components/medical-care-header';
import { DepartmentTabs } from '@/components/department-tabs';
import { DepartmentALL, DepartmentObstetrics } from '@/types/department';
import { phaseOrders } from '@/types/phase';
import ProcedureItem from '@/components/procedure-item';
import {
  useDeleteMedicalCare,
  useGetMedicalCare,
  useUpdateMedicalCare,
} from '@/service/medical-care';
import { TablesUpdate } from '@/lib/database.types';
import { ReportTabs } from '@/components/report-tabs';
import { ReportDetail, ReportTimeline } from '@/types/report';
import { MedicalCare } from '@/service/medical-care/type';
import { durationTimeFormat } from '@/lib/date';

function MedicalCareContent() {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: care, isPending, isError } = useGetMedicalCare(id || '');
  const { mutate: mutateUpdate } = useUpdateMedicalCare();
  const { mutate: mutateDelete } = useDeleteMedicalCare();

  const [selectReport, setSelectReport] = useState(
    care?.finished_at ? ReportTimeline : ReportDetail,
  );

  if (isPending) {
    return <div>読み込み中...</div>;
  }

  if (isError) {
    console.error('Error fetching medical care:');
    return <div>エラーが発生しました。</div>;
  }

  // 医療の更新
  const handleUpdateAny = async (updates: Partial<TablesUpdate<'medical_cares'>>) => {
    if (!care) {
      return;
    }
    mutateUpdate({ id: care.id, updates });
    if ('finished_at' in updates) {
      router.push(`/medical_cares/`);
    }
  };

  // 医療の削除
  const handleDelete = async () => {
    if (!care) {
      return;
    }
    await mutateDelete({ id: care.id });
    router.push(`/`);
  };

  // 処置の更新
  const handleUpdateProcedure = async (proc: Procedure) => {
    if (!care) {
      return;
    }
    const newProcedures = care.procedures.map((p) =>
      p.label === proc.label && p.department === proc.department ? proc : p,
    );
    mutateUpdate({ id: care.id, updates: { procedures: newProcedures } });
  };

  return (
    <div className="">
      {care && (
        <div className="">
          <div className="sticky bg-white shadow top-0 z-0 flex justify-center items-center p-8 w-full flex-col space-y-4">
            <MedicalCareHeader care={care} onUpdate={handleUpdateAny} onDelete={handleDelete} />
            {care.finished_at && <ReportTabs current={selectReport} onChange={setSelectReport} />}
            <DepartmentTabs
              procedures={care.procedures}
              current={selectedDept}
              onChange={setSelectedDept}
            />
          </div>

          <section className="p-8">
            {selectReport === ReportDetail &&
              proceduresDetail(care, selectedDept, handleUpdateProcedure)}
            {selectReport === ReportTimeline && proceduresTimeline(care, selectedDept)}
          </section>
        </div>
      )}
    </div>
  );
}

const proceduresDetail = (
  care: MedicalCare,
  selectedDept: string,
  onUpdate: { (proc: Procedure): Promise<void>; (proc: Procedure): void },
) => {
  return phaseOrders.map((phase) => {
    const procs = care.procedures.filter(
      (proc) =>
        proc.phase === phase &&
        (selectedDept === DepartmentALL || proc.department === selectedDept),
    );

    return procs.length > 0 ? (
      <div key={phase} className="mb-8 space-y-4">
        <h2
          className="text-lg border-b-2 border-secondary-foreground inline-block font-bold"
          key={phase}
        >
          {phase}
        </h2>
        <ul className="flex flex-col ml-4 gap-2">
          {care.procedures
            .filter(
              (proc) =>
                proc.phase === phase &&
                (selectedDept === DepartmentALL || proc.department === selectedDept),
            )
            .map((p) => (
              <li key={`${p.department}_${p.label}`}>
                <ProcedureItem care={care} proc={p} onUpdate={onUpdate} />
              </li>
            ))}
        </ul>
      </div>
    ) : null;
  });
};

const proceduresTimeline = (care: MedicalCare, selectedDept: string) => {
  const orderProcedures = care.procedures
    .filter(
      (p) => !!p.started_at && (selectedDept === DepartmentALL || p.department === selectedDept),
    )
    .sort((a, b) => {
      const aDate = new Date(a.started_at as string);
      const bDate = new Date(b.started_at as string);
      return aDate.getTime() - bDate.getTime();
    });

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-lg border-b-2 border-secondary-foreground inline-block font-bold">
        時系列順
      </h2>
      <ul className="flex flex-col ml-4 gap-2">
        {orderProcedures.map((p) => (
          <li
            key={`${p.department}_${p.label}`}
            className="flex items-center gap-4 justify-between"
          >
            <p className="w-20 text-right flex-0">
              {durationTimeFormat(new Date(care.started_at!), new Date(p.started_at!))}
            </p>
            <p className="text-xs px-4 py-2 border-2 border-muted rounded-lg">{p.department}</p>
            <p className="text-lg flex-1">{p.label}</p>
            {p.finished_at && (
              <p>{durationTimeFormat(new Date(p.started_at!), new Date(p.finished_at!))}で完了</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ページコンポーネント
export default function MedicalCarePage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MedicalCareContent />
    </Suspense>
  );
}
