'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DepartmentICU, DepartmentNICU, DepartmentObstetrics } from '@/types/department';
import { MedicalCare } from '@/types/medical-care';
import { useState } from 'react';

export default function Page() {
  // getMedicalCare()を初期値として、stateの更新はsetMedicalCare()で行う

  const [MedicalCare, setMedicalCare] = useState(getMedicalCare());
  const createdAt = new Date(MedicalCare.created_at || '');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 py-8">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold">{MedicalCare.label}</h1>
        <p>症状発生日時: {createdAt.toISOString()}</p>
      </div>

      <section className="p-4 flex flex-col items-center">
        <h2 className="text-lg bg-muted p-4 font-bold">処置状況</h2>
        <ul className="grid grid-cols-2 p-4 gap-4">
          {MedicalCare.procedures.map((p, index) => {
            const startedAt = p.started_at ? new Date(p.started_at) : null;
            const finishedAt = p.finished_at ? new Date(p.finished_at) : null;

            return (
              <li
                key={index}
                className={cn(
                  'border border-gray-500 rounded-lg',
                  !startedAt && !finishedAt && 'bg-white',
                  startedAt && !finishedAt && 'bg-red-100',
                  startedAt && finishedAt && 'bg-gray-200',
                )}
              >
                <div className="p-2">
                  <span className={cn('p-1', border(p.department))}>{p.department}</span>
                  <p className="truncate">{p.details}</p>
                </div>
                <hr className="border-gray-500" />
                {!p.started_at && (
                  <div className="flex flex-col justify-center items-center p-4 space-y-2">
                    <Button
                      variant={'destructive'}
                      onClick={() => {
                        const p = MedicalCare.procedures.find((p) => p.details === p.details);
                        if (p) {
                          p.started_at = new Date().toISOString();
                          // pを更新したものを新しい配列にしてsetMedicalCareする
                          setMedicalCare({
                            ...MedicalCare,
                            procedures: MedicalCare.procedures.map((proc) =>
                              proc.details === p.details ? p : proc,
                            ),
                          });
                        }
                      }}
                    >
                      開始
                    </Button>
                  </div>
                )}
                {p.started_at && !p.finished_at && (
                  <div className="flex flex-col justify-center items-center p-4 space-y-2">
                    <p className="border-b-2 p-2">3分20秒後に開始済み</p>
                    <Button>終了</Button>
                  </div>
                )}
                {p.started_at && p.finished_at && (
                  <div className="flex flex-col justify-center items-center p-4 space-y-2">
                    <p className="border-b-2 p-2">3分20秒後に開始済み</p>
                    <p className="border-b-2 p-2">4分27秒後に終了済み</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="p-4 flex flex-col items-center">
        <h2 className="text-lg bg-muted p-4 font-bold">処置履歴</h2>
        <ul className="flex flex-col space-y-2">
          {histories.map((history, index) => (
            <li key={index} className="">
              <div className="flex items-center">
                <p>{history.time}</p>
                <p className={cn('inline p-1', border(history.department))}>{history.department}</p>
              </div>
              <div className="flex justify-start items-center space-x-2">
                <p>{history.details}</p>
                <p
                  className={cn(
                    'p-2',
                    history.action === '開始' ? 'border-black border' : 'bg-black text-white',
                  )}
                >
                  {history.action}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const getMedicalCare = (): MedicalCare => {
  return {
    created_at: '2025-01-05T10:10:36',
    id: '1234',
    label: '死戦期帝王切開-1234',
    procedures: [
      {
        department: DepartmentObstetrics,
        label: '帝王切開',
        phase: '初期処置',
        details: '帝王切開の決断と実施、迅速な準備および娩出後の子宮管理。',
        started_at: '2025-01-05T10:12:16',
        finished_at: '2025-01-05T10:12:18',
      },
      {
        department: DepartmentObstetrics,
        label: '帝王切開',
        phase: '初期処置',
        details: '大出血や弛緩出血への対応、子宮収縮薬の投与や必要に応じた外科的処置。',
      },
      {
        department: DepartmentObstetrics,
        label: '帝王切開',
        phase: '初期処置',
        details: '他診療科との連携指示、術野確保や輸血依頼などの要請。',
      },
      {
        department: DepartmentNICU,
        label: '帝王切開',
        phase: '初期処置',
        details: '新生児蘇生の実施、体温保持と気道確保。',
        started_at: '2025-01-05T10:12:45',
      },
      {
        department: DepartmentNICU,
        label: '帝王切開',
        phase: '初期処置',
        details: '低酸素や未熟性への対応、NICUでの集中管理。',
      },
      {
        department: DepartmentICU,
        label: '帝王切開',
        phase: '初期処置',
        details: 'ECMOやPCPSの適応評価と導入。',
      },
      {
        department: DepartmentICU,
        label: '帝王切開',
        phase: '初期処置',
        details: '心機能管理と薬剤調整、昇圧薬や強心薬の投与。',
      },
      {
        department: DepartmentICU,
        label: '帝王切開',
        phase: '初期処置',
        details: '術後の集中ケアと母体のバイタル安定化管理。',
      },
    ],
    symptom: '死戦期帝王切開',
    finished_at: '2021-08-02',
    started_at: '2021-08-01',
  };
};

const histories = [
  {
    time: '1分12秒後',
    department: '産科',
    details: '帝王切開の決断と実施、迅速な準備',
    action: '開始',
  },
  {
    time: '1分52秒後',
    department: '麻酔科',
    details: '気道管理、気管挿管や酸素化・換気のサポート。',
    action: '開始',
  },
  {
    time: '2分10秒後',
    department: '救急科',
    details: '心肺停止時のBLS/ACLS開始、バイタルサインや除細動の管理。',
    action: '開始',
  },
  {
    time: '2分15秒後',
    department: '新生児科',
    details: '低酸素や未熟性への対応、NICUでの集中管理。',
    action: '開始',
  },
  {
    time: '2分34秒後',
    department: '産科',
    details: '帝王切開の決断と実施、迅速な準備',
    action: '終了',
  },
];

const border = (department: string) => {
  switch (department) {
    case '産科':
      return 'border border-red-500';
    case '麻酔科':
      return 'border border-yellow-500';
    case '救急科':
      return 'border border-green-500';
    case '新生児科':
      return 'border border-cyan-500';
    case '輸血部':
      return 'border border-teal-500';
    case '集中治療科':
      return 'border border-blue-500';
    case '看護部':
      return 'border border-purple-500';
    case '薬剤部':
      return 'border border-pink-500';
    default:
      return 'border border-gray-500';
  }
};
