'use client';

import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { selectMedicalCaresFinished } from '@/queries/select-medical-cares';
import { MedicalCare } from '@/types/medical-care';
import { Procedure } from '@/types/medical-care-template';
import { BriefcaseMedical } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const auth = useAuth();
  const [cares, setCares] = useState<MedicalCare[]>([]);

  useEffect(() => {
    if (!auth.session) {
      console.log('no session');
      return;
    }

    selectMedicalCaresFinished(supabase).then((res) => {
      if (!res.data) {
        console.error('res no data');
        return;
      }

      const newCares: MedicalCare[] = res.data.map((item) => ({
        ...item,
        procedures: (item.procedures || []) as Procedure[],
      }));
      setCares(newCares);
    });
  }, [auth.session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative space-y-8">
      <div className="">
        <h1 className="flex items-center gap-2 text-2xl">
          <BriefcaseMedical />
          過去の取り組み
        </h1>
      </div>
      <p>検索機能は未実装です</p>
      <section className="">
        <ul className="p-4 space-y-4">
          {cares.map((care) => (
            <Card key={care.id} className="p-4 bg-muted flex flex-col">
              <Link href={`/medical_cares/details?id=${care.id}`}>
                <p className="">{care.label}</p>
              </Link>
            </Card>
          ))}
        </ul>
      </section>
    </div>
  );
}
