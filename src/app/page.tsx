'use client';

import { MedicalCareDialog } from '@/components/medical-care-insert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetMedicalCaresInProgress } from '@/service/medical-care';
import { Hospital, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { data: cares, isPending, isError } = useGetMedicalCaresInProgress();

  if (isPending) {
    return <div>読み込み中...</div>;
  }

  if (isError) {
    console.error('Error fetching medical care:');
    return <div>エラーが発生しました。</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center relative space-y-8 p-8">
      {/* <div className="flex flex-col items-center justify-center min-h-screen relative space-y-8"> */}
      <h1 className="text-2xl my-8 flex items-center gap-2">
        <Hospital />
        ホーム
      </h1>
      <section className="">
        <h2 className="text-lg my-4 text-center">実施中のシミュレーション</h2>
        {cares && (
          <ul className="p-4 space-y-4">
            {cares.map((care) => (
              <Card key={care.id} className="p-4 bg-red-100 flex flex-col">
                <Link href={`/medical_cares/details?id=${care.id}`}>
                  <p className="">{care.label}</p>
                </Link>
              </Card>
            ))}
          </ul>
        )}
      </section>
      <MedicalCareDialog>
        <Button variant={'outline'} className="p-8">
          <Plus />
          新規シミュレーション
        </Button>
      </MedicalCareDialog>
    </div>
  );
}
