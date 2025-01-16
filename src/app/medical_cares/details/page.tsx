'use client';

import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { getMedicalCare } from '@/queries/select-medical-cares';
import { MedicalCare } from '@/types/medical-care';
import { Procedure } from '@/types/medical-care-template';
import { useSearchParams } from 'next/navigation';
// import { supabase } from '@/lib/supabase';
// import { MedicalCare } from '@/types/medical-care';
// import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function MedicalCareContent() {
  const auth = useAuth();
  const [care, setCare] = useState<MedicalCare | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  console.log(`id: ${id}`);

  useEffect(() => {
    if (!auth.session) {
      console.log('no session');
      return;
    }
    if (!id) {
      console.log('no id');
      return;
    }
    console.log(`fetch id: ${id}`);

    getMedicalCare(supabase, id).then((res) => {
      if (!res.data) {
        console.error('res no data');
        return;
      }
      console.log(`res.data.label: ${res.data.label}`);
      // resのproceduresをJsonからProcedure[]に変換
      const newCare: MedicalCare = {
        ...res.data,
        procedures: (res.data.procedures || []) as Procedure[],
      };
      setCare(newCare);

      // setIsLoading(false);
    });
  }, [auth.session, id]);

  // if (isLoading) return <div>読み込み中...</div>;
  // if (error) return <div>エラー: {error.message}</div>;
  // if (!medicalCare) return <div>データが見つかりません</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1>診療詳細</h1>
      {care && (
        <div>
          <div className="sticky top-0 bg-yellow-100 z-10">
            <h1>{care.label}</h1>
          </div>
          <div className="bg-pink-100 h-[120px]">タブエリア</div>
          <div className="bg-blue-100 h-[480px]">aaa bbb</div>
        </div>
      )}
    </div>
  );
}

// ページコンポーネント
export default function MedicalCarePage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <MedicalCareContent />
    </Suspense>
  );
}
