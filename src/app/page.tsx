import FabModalDialog from '@/components/fab-modal-dialog';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  // const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      <h1 className="text-2xl my-8">医療シミュレーションWeb</h1>
      <section className="rounded-lg border-gray-500 p-4 border-2">
        <h2 className="text-lg my-4">シミュレーション実施中</h2>
        <Card className="p-4 bg-muted flex flex-col">
          <Link href="/medical_cares/1234">
            <p className="text-xl font-bold">ID: 死戦期帝王切開-1234</p>
          </Link>
        </Card>
      </section>
      <FabModalDialog />
    </div>
  );
}
