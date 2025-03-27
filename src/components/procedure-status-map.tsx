import { DepartmentParagraph } from '@/components/department-icon';
import ProcedureStatusItem from '@/components/procedure-status-item';
import StepHeadline from '@/components/step-headline';
import { useUpdateMedicalCare } from '@/service/medical-care';
import { MedicalCare } from '@/service/medical-care/type';
import { Department, departmentOrders } from '@/types/procedure';
import { Procedure, procedureSteps } from '@/types/procedure';
import React from 'react';

export default function ProdedureStatusMap({ care }: { care: MedicalCare }) {
  const { mutate: mutateUpdate } = useUpdateMedicalCare();

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

  // 担当科の絞り込み
  const workingDepartment = departmentOrders.filter((dept) =>
    care.procedures.some((p) => p.department === dept),
  );

  return (
    <div className="overflow-auto">
      {procedureSteps.map((step) => {
        // ステップごとの処置
        const targetProcedures = care.procedures.filter((proc) => proc.step === step);
        return (
          <div key={step} className="mb-4 w-full">
            <StepHeadline step={step} />
            <div key={step} className="flex gap-4">
              {workingDepartment.map((dept) => (
                <div key={dept} className="space-y-2">
                  <DepartmentParagraph
                    department={dept as Department}
                    className="font-bold w-[200px]"
                  />
                  <ul className="flex flex-col gap-2">
                    {targetProcedures
                      .filter((proc) => proc.department === dept)
                      .map((p) => (
                        <li key={p.id} className="w-[200px]">
                          <ProcedureStatusItem
                            care={care}
                            proc={p}
                            onUpdate={handleUpdateProcedure}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
