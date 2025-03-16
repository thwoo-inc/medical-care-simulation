import { DepartmentParagraph, DepartmentSpan } from '@/components/department-icon';
import ProcedureItem from '@/components/procedure-item';
import { useUpdateMedicalCare } from '@/service/medical-care';
import { MedicalCare } from '@/service/medical-care/type';
import { Department } from '@/types/department';
import { phaseOrders } from '@/types/phase';
import { Procedure } from '@/types/procedure';
import React from 'react';

export default function ProdedureDepartment({ care }: { care: MedicalCare }) {
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

  // departmentごとの処置のマップ
  const departmentProcedures = care.procedures.reduce((acc, proc) => {
    if (!acc[proc.department]) {
      acc[proc.department] = [];
    }
    acc[proc.department].push(proc);
    return acc;
  }, {} as { [key: string]: Procedure[] });

  return (
    <div className="flex gap-4 overflow-auto">
      {Object.entries(departmentProcedures).map(([dept, deptProcs]) => (
        <div key={dept} className="space-y-4">
          <DepartmentParagraph department={dept as Department} className="font-bold text-xl" />

          {phaseOrders.map((phase) => {
            const phaseProcs = deptProcs.filter((proc) => proc.phase === phase);

            return phaseProcs.length > 0 ? (
              <div key={phase} className="mb-8 space-y-4">
                <p className="text-lg border-b-2 border-black inline-block font-bold" key={phase}>
                  <DepartmentSpan department={dept as Department} /> {phase}
                </p>
                <ul className="flex flex-col gap-2">
                  {phaseProcs.map((p) => (
                    <li key={`${p.department}_${p.label}`}>
                      <ProcedureItem care={care} proc={p} onUpdate={handleUpdateProcedure} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
          })}
        </div>
      ))}
    </div>
  );
}
