'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import MedicalCareHeader from '@/components/medical-care-header';
import { phaseOrders } from '@/types/phase';
import ProcedureItem from '@/components/procedure-item';
import {
  useDeleteMedicalCare,
  useGetMedicalCare,
  useUpdateMedicalCare,
} from '@/service/medical-care';
import { TablesUpdate } from '@/lib/database.types';
import { ReportTabs } from '@/components/report-tabs';
import { ReportDepartment, ReportTimeline } from '@/types/report';
import { MedicalCare } from '@/service/medical-care/type';
import { durationTimeFormat } from '@/lib/date';
import Spinner from '@/components/spinner';
import { Procedure } from '@/types/procedure';
import DepartmentIcon from '@/components/department-icon';
import { Department } from '@/types/department';

function MedicalCareContent() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { data: care, isPending, isError } = useGetMedicalCare(id || '');
  const { mutate: mutateUpdate } = useUpdateMedicalCare();
  const { mutate: mutateDelete } = useDeleteMedicalCare();

  const [selectReport, setSelectReport] = useState(
    care?.finished_at ? ReportTimeline : ReportDepartment,
  );

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
    <>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && care && (
        <div className="">
          <div className="fixed bg-white top-0 w-full z-0 px-12 py-4 space-y-4 shadow overflow-x-hidden">
            <MedicalCareHeader care={care} onUpdate={handleUpdateAny} onDelete={handleDelete} />
            <ReportTabs current={selectReport} onChange={setSelectReport} />
          </div>

          <section className="flex-1 p-4 overflow-x-auto pt-[360px] sm:pt-[280px]">
            {selectReport === ReportDepartment && proceduresDepartment(care, handleUpdateProcedure)}
            {selectReport === ReportTimeline && proceduresTimeline(care)}
          </section>
        </div>
      )}
    </>
  );
}

const proceduresDepartment = (
  care: MedicalCare,
  onUpdate: { (proc: Procedure): Promise<void>; (proc: Procedure): void },
) => {
  // departmentごとの処置のマップ
  const departmentProcedures = care.procedures.reduce((acc, proc) => {
    if (!acc[proc.department]) {
      acc[proc.department] = [];
    }
    acc[proc.department].push(proc);
    return acc;
  }, {} as { [key: string]: Procedure[] });

  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        {Object.entries(departmentProcedures).map(([dept, deptProcs]) => (
          <div key={dept} className="space-y-4">
            <DepartmentIcon department={dept as Department} />

            {phaseOrders.map((phase) => {
              const phaseProcs = deptProcs.filter((proc) => proc.phase === phase);

              return phaseProcs.length > 0 ? (
                <div key={phase} className="mb-8 space-y-4">
                  <h4
                    className="text-lg border-b-2 border-secondary-foreground inline-block font-bold"
                    key={phase}
                  >
                    {phase}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {phaseProcs.map((p) => (
                      <li key={`${p.department}_${p.label}`}>
                        <ProcedureItem care={care} proc={p} onUpdate={onUpdate} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const proceduresTimeline = (care: MedicalCare) => {
  const orderProcedures = care.procedures
    .filter((p) => !!p.started_at)
    .sort((a, b) => {
      const aDate = new Date(a.started_at as string);
      const bDate = new Date(b.started_at as string);
      return aDate.getTime() - bDate.getTime();
    });

  return (
    <div className="space-y-4">
      <ul className="flex flex-col ml-4 gap-2">
        {orderProcedures.map((p) => (
          <li
            key={`${p.department}_${p.label}`}
            className="flex items-center gap-4 justify-between"
          >
            <p className="w-20 text-right flex-0">
              {durationTimeFormat(new Date(care.started_at!), new Date(p.started_at!))}
            </p>
            <DepartmentIcon department={p.department} />
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
