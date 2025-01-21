'use client';

import { Card } from '@/components/ui/card';
import { useGetMedicalCaresFinished } from '@/service/medical-care';
import { BriefcaseMedical } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { data: cares, isPending, isError } = useGetMedicalCaresFinished();

  if (isPending) {
    return <div>読み込み中...</div>;
  }

  if (isError) {
    console.error('Error fetching medical care:');
    return <div>エラーが発生しました。</div>;
  }

  return (
    // <div className="flex flex-col items-center justify-center w-full min-h-screen relative space-y-8">
    <div className="flex flex-col items-center justify-center w-full relative space-y-8 p-8">
      <div className="">
        <h1 className="flex items-center gap-2 text-2xl my-8">
          <BriefcaseMedical />
          過去の取り組み
        </h1>
      </div>
      {cares && (
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
      )}
    </div>
  );
}
