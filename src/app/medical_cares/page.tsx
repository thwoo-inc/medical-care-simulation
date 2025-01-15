import { BriefcaseMedical } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl my-4 flex items-center gap-2">
        <BriefcaseMedical />
        過去の取り組み
      </h1>
      <p>検索機能</p>
    </div>
  );
}
