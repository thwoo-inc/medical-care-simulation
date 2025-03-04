'use client';

import Spinner from '@/components/spinner';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGetMedicalCareTemplates } from '@/service/medical-care-template';
import {
  DepartmentAnesthesiology,
  DepartmentICU,
  DepartmentNICU,
  DepartmentObstetrics,
  DepartmentStaff,
} from '@/types/department';
import { Procedure } from '@/types/procedure';
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
          <h1 className="text-2xl my-8 flex items-center gap-2">
            <ClipboardList />
            テンプレート
          </h1>
          {tmpls.map((t) => (
            <Card key={t.id} className="p-4 bg-muted flex flex-col">
              <h2 className="text-lg my-4">{t.symptom}</h2>
              <ul className="grid grid-cols-2 gap-2">
                {t.procedures.map((procedure: Procedure, idx: number) => (
                  <li key={idx} className="flex space-x-2">
                    <p className={cn('text-sm p-1', border(procedure.department))}>
                      {procedure.department}
                    </p>
                    <p className="text-sm truncate">{procedure.label}</p>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

const border = (department: string) => {
  switch (department) {
    case DepartmentObstetrics:
      return 'border border-red-500';
    // case :
    //   return 'border border-yellow-500';
    case DepartmentNICU:
      return 'border border-green-500';
    // case '新生児科':
    //   return 'border border-cyan-500';
    case DepartmentICU:
      return 'border border-teal-500';
    // case '集中治療科':
    //   return 'border border-blue-500';
    case DepartmentAnesthesiology:
      return 'border border-purple-500';
    case DepartmentStaff:
      return 'border border-pink-500';
    default:
      return 'border border-gray-500';
  }
};
