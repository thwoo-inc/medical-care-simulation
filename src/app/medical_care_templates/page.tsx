'use client';

import Spinner from '@/components/spinner';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useMedicalCareTemplateAll } from '@/hooks/use-medical-care-query';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import {
  DepartmentAnesthesiology,
  DepartmentICU,
  DepartmentNICU,
  DepartmentObstetrics,
} from '@/types/department';
import { Procedure } from '@/types/medical-care-template';
import { useQuery } from '@tanstack/react-query';
import { ClipboardList } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { fetchTreatmentTemplates } from '@/utils/supabase';
// import { useEffect, useState } from 'react';

export default function Page() {
  const auth = useAuth();

  console.log(`auth.session: ${auth.session}`);

  const {
    data: templates,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...useMedicalCareTemplateAll({ client: supabase }),
    enabled: !!auth.session,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl my-8 flex items-center gap-2">
        <ClipboardList />
        テンプレート
      </h1>
      {isLoading && <Spinner />}
      {isError && <div className="text-red-500">{error.message}</div>}
      {!isLoading &&
        templates &&
        templates.map((template) => (
          <Card key={template.id} className="p-4 bg-muted flex flex-col">
            <h2 className="text-lg my-4">{template.symptom}</h2>
            <ul className="grid grid-cols-2 gap-2">
              {template.procedures.map((procedure: Procedure, idx: number) => (
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
    </div>
  );
}

// const getTreatmentTemplates = (): MedicalcareTemplate[] => {
//   // 配列の結合を返す
//   return [
//     {
//       id: '1234',
//       symptom: '死戦期帝王切開（院内発生）',
//       procedures: proceduresByObstetrics.concat(
//         proceduresByNICU,
//         proceduresByICU,
//         proceduresByCardiology,
//       ),
//       created_at: '2025-01-14T07:22:03.366884',
//     },
//   ];
// };

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
    // case '薬剤部':
    //   return 'border border-pink-500';
    default:
      return 'border border-gray-500';
  }
};
