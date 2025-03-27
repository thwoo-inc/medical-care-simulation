'use client';

import { MedicalCareInsertForm } from '@/components/medical-care-insert-form';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGetMedicalCaresInProgress } from '@/service/medical-care';
import { Hospital, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  const { data: cares, isPending, isError } = useGetMedicalCaresInProgress();

  return (
    <div className="flex flex-col items-center justify-center relative space-y-8 p-8">
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && cares && (
        <>
          <h1 className="text-2xl my-8 flex font-bold items-center gap-2">
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
                      <p className="font-bold text-lg">{care.label}</p>
                    </Link>
                  </Card>
                ))}
              </ul>
            )}
          </section>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="p-8 text-base">
                新規シミュレーション
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle className="text-center">新規シミュレーション</DialogTitle>
              <DialogDescription className="text-center">
                テンプレートを選択して開始してください
              </DialogDescription>
              <MedicalCareInsertForm />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
