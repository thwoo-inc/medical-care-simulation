import { DepartmentTabs } from '@/components/department-tabs';
import { Card } from '@/components/ui/card';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { Department, DepartmentObstetrics } from '@/types/department';
import { Procedure } from '@/types/procedure';
import React, { useMemo, useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { DepartmentSpan } from '@/components/department-icon';

export default function TemplateCard({ t }: { t: MedicalCareTemplate }) {
  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const departmentCounts = useMemo(() => {
    return t.procedures.reduce((acc, procedure) => {
      acc[procedure.department] = (acc[procedure.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [t.procedures]);

  return (
    <Card key={t.id} className="p-4 bg-muted flex flex-col">
      <h2 className="text-lg my-2">{t.symptom}</h2>
      <div className="flex flex-wrap gap-2 my-2">
        {Object.entries(departmentCounts).map(([dept, count]) => (
          <p key={dept} className="text-sm">
            {<DepartmentSpan department={dept as Department} />}
            {count}件
          </p>
        ))}
      </div>

      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="my-2 flex items-center mx-auto"
      >
        {isAccordionOpen ? <ChevronsUp className="size-6" /> : <ChevronsDown className="size-6" />}
      </button>

      {isAccordionOpen && (
        <div className="space-y-2">
          <DepartmentTabs
            procedures={t.procedures}
            current={selectedDept}
            onChange={setSelectedDept}
          />

          <ul className="flex flex-wrap gap-2">
            {t.procedures
              .filter((p) => p.department === selectedDept)
              .map((procedure: Procedure, idx: number) => (
                <li key={idx} className="">
                  <p className="text-sm truncate">{procedure.label}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
