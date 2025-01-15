import { MedicalCareDialog } from '@/components/medical-care-insert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hospital, Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  // const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-2xl my-8 flex items-center gap-2">
        <Hospital />
        ホーム
      </h1>
      <section className="rounded-lg border-gray-500 p-4 border-2">
        <h2 className="text-lg my-4">シミュレーション実施中</h2>
        <Card className="p-4 bg-muted flex flex-col">
          <Link href="/medical_cares/1234">
            <p className="text-xl font-bold">ID: 死戦期帝王切開-1234</p>
          </Link>
        </Card>
      </section>
      {/* <FabModalDialog /> */}
      <MedicalCareDialog>
        <Button>
          <Plus className="size-4" />
        </Button>
      </MedicalCareDialog>
    </div>
  );
}
