'use client';

import { MedicalCareDialog } from '@/components/medical-care-insert-dialog';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { selectMedicalCaresInProgress } from '@/queries/select-medical-cares';
import { MedicalCare } from '@/types/medical-care';
import { Procedure } from '@/types/medical-care-template';
import { Hospital, Plus } from 'lucide-react';
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

    selectMedicalCaresInProgress(supabase).then((res) => {
      if (!res.data) {
        console.error('res no data');
        return;
      }
      console.log(`res.data.length: ${res.data.length}`);

      const newCares: MedicalCare[] = res.data.map((item) => ({
        ...item,
        procedures: (item.procedures || []) as Procedure[],
      }));
      setCares(newCares);
    });
  }, [auth.session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative space-y-8">
      <h1 className="text-2xl my-8 flex items-center gap-2">
        <Hospital />
        ホーム
      </h1>
      <section className="">
        <h2 className="text-lg my-4 text-center">実施中のシミュレーション</h2>
        <ul className="p-4 space-y-4">
          {cares.map((care) => (
            <Card key={care.id} className="p-4 bg-red-100 flex flex-col">
              <Link href={`/medical_cares/details?id=${care.id}`}>
                <p className="">{care.label}</p>
              </Link>
            </Card>
          ))}
        </ul>
      </section>
      <MedicalCareDialog>
        <Card className="p-4 flex gap-2">
          {/* <Button variant={'outline'} className="p-4 text-lg"> */}
          <Plus />
          新規シミュレーション
          {/* </Button> */}
        </Card>
      </MedicalCareDialog>
    </div>
  );
}
