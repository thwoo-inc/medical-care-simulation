import { DepartmentTabs } from '@/components/department-tabs';
import ProcedureAddItem from '@/components/procedure-add-item';
import ProcedureEditItem from '@/components/procedure-edit-item';
import StepHeadline from '@/components/step-headline';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { DepartmentObstetrics, departmentOrders } from '@/types/procedure';
import { procedureSteps } from '@/types/procedure';
import React, { useState } from 'react';

export default function ProdedureEditMap({ template }: { template: MedicalCareTemplate }) {
  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);

  // 担当科の絞り込み
  const workingDepartment = departmentOrders.filter((dept) =>
    template.procedures.some((p) => p.department === dept),
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <DepartmentTabs
        procedures={template.procedures}
        current={selectedDept}
        onChange={setSelectedDept}
      />
      {procedureSteps.map((step) => {
        // ステップごとの処置
        const stepProcedures = template.procedures.filter(
          (proc) => proc.step === step && (selectedDept === '' || proc.department === selectedDept),
        );
        return (
          <div key={step} className="mb-4 w-full">
            <StepHeadline step={step} />
            <div key={step} className="">
              {stepProcedures.length > 0 &&
                workingDepartment.map((dept) => {
                  const deptProcedures = stepProcedures.filter((proc) => proc.department === dept);

                  return deptProcedures.length > 0 ? (
                    <div key={dept} className="space-y-2 mb-4">
                      <ul className="grid gap-2 gap-y-4 w-full grid-cols-1 lg:grid-cols-2">
                        {deptProcedures.map((p) => (
                          <li key={p.id} className="w-full h-full">
                            <ProcedureEditItem template={template} proc={p} />
                          </li>
                        ))}
                        {selectedDept !== '' && (
                          <li className="w-full h-full">
                            <ProcedureAddItem template={template} department={dept} step={step} />
                          </li>
                        )}
                      </ul>
                    </div>
                  ) : null;
                })}
              {stepProcedures.length === 0 && (
                <ProcedureAddItem template={template} department={selectedDept} step={step} />
              )}
              {selectedDept === '' && (
                <div className="w-full h-full">
                  <ProcedureAddItem template={template} department={''} step={step} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
