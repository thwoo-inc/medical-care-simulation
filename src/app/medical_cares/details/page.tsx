'use client';

import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { getMedicalCare } from '@/queries/select-medical-cares';
import { MedicalCare } from '@/types/medical-care';
import { Procedure } from '@/types/medical-care-template';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import MedicalCareHeader from '@/components/medical-care-header';
import { DepartmentTabs } from '@/components/department-tabs';
import { DepartmentObstetrics } from '@/types/department';
import { phaseOrders } from '@/types/phase';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// import { durationTimeFormat } from '@/lib/date';

function MedicalCareContent() {
  const auth = useAuth();
  const [care, setCare] = useState<MedicalCare | null>(null);

  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!auth.session) {
      return;
    }
    if (!id) {
      console.log('no id');
      return;
    }

    getMedicalCare(supabase, id).then((res) => {
      if (!res.data) {
        console.error('res no data');
        return;
      }
      const newCare: MedicalCare = {
        ...res.data,
        procedures: (res.data.procedures || []) as Procedure[],
      };
      setCare(newCare);
    });
  }, [auth.session, id]);

  // 終了処理
  // const handleFinish = async () => {
  //   if (!care) {
  //     return;
  //   }

  //   try {
  //     const result = await updateMedicalCare(supabase, care.id, {
  //       finished_at: new Date().toISOString(),
  //     });
  //     if (result.error) {
  //       console.error(`updateMedicalCare failed: ${result.error}`);
  //       return;
  //     }
  //     console.log('updateMedicalCare success');
  //   } catch (error) {
  //     console.error(`updateMedicalCare catch: ${error}`);
  //   }
  // };

  return (
    <div className="">
      {care && (
        <div className="">
          <div className="sticky bg-white shadow top-0 z-0 flex justify-center items-center p-8 w-full flex-col space-y-4">
            <MedicalCareHeader care={care} />
            <DepartmentTabs
              procedures={care.procedures}
              current={selectedDept}
              onChange={setSelectedDept}
            />
          </div>

          <section className="p-8">
            {phaseOrders.map((phase) => {
              const procs = care.procedures.filter(
                (proc) => proc.phase === phase && proc.department === selectedDept,
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
                      .filter((proc) => proc.phase === phase && proc.department === selectedDept)
                      .map((p) => (
                        <li
                          key={p.label}
                          className={cn(
                            'px-4 flex gap-4 items-center justify-between py-2 border border-primary rounded-lg',
                            !p.started_at
                              ? 'bg-white'
                              : !p.finished_at
                              ? 'bg-red-100'
                              : 'bg-gray-100',
                          )}
                        >
                          <div className="">
                            <p className="text-lg">{p.label}</p>
                            {!care.finished_at && !p.finished_at && (
                              <p className="text-sm">{p.details}</p>
                            )}
                          </div>
                          {!care.finished_at && (
                            <div className="flex gap-2">
                              <Button
                                variant="secondary"
                                className={cn(!p.started_at && 'invisible')}
                              >
                                戻す
                              </Button>
                              <Button className={cn(p.finished_at && 'invisible')}>
                                {!p.started_at ? '開始' : '完了'}
                              </Button>
                            </div>
                          )}
                          {care.finished_at && (
                            <div className="flex flex-col">
                              {/* {care.started_at && p.started_at && (
                                <p className="text-sm">
                                  {durationTimeFormat(
                                    new Date(care.started_at),
                                    new Date(p.started_at),
                                  )}{' '}
                                  後に開始
                                </p>
                              )}
                              {care.started_at && p.finished_at && (
                                <p className="text-sm">
                                  {durationTimeFormat(
                                    new Date(care.started_at),
                                    new Date(p.finished_at),
                                  )}{' '}
                                  後に完了
                                </p>
                              )} */}
                              {care.started_at && <p className="text-sm">3分2秒 後に開始</p>}
                              {care.started_at && <p className="text-sm">3分51秒 後に完了</p>}
                            </div>
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null;
            })}
          </section>
        </div>
      )}
    </div>
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
