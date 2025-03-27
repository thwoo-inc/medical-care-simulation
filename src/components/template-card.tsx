import { DepartmentTabs } from '@/components/department-tabs';
import { Card } from '@/components/ui/card';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { DepartmentObstetrics } from '@/types/procedure';
import { Procedure } from '@/types/procedure';
import React, { useState } from 'react';
import { ChevronsDown, ChevronsUp, Copy, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MedicalCareTemplateCopyForm } from '@/components/medical-care-template-copy-form';
import { Button } from '@/components/ui/button';
import { useDeleteMedicalCareTemplate } from '@/service/medical-care-template';
import { toast } from 'sonner';
import Link from 'next/link';
import DepartmentCount from '@/components/department-count';

export default function TemplateCard({ t }: { t: MedicalCareTemplate }) {
  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: mutateDelete } = useDeleteMedicalCareTemplate();

  const handleDelete = async () => {
    await mutateDelete({ id: t.id });
    toast.success('テンプレートを削除しました');
  };

  const buttonStyle = 'p-2 shadow border rounded';

  return (
    <>
      <Card key={t.id} className="bg shadow flex flex-col w-full">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <h2 className="text-xl font-bold">{t.symptom}</h2>
            <ul className="flex gap-4">
              <li className={buttonStyle}>
                <Link href={`/medical_care_templates/details?id=${t.id}`}>
                  <Edit size="20" />
                </Link>
              </li>
              <li className={buttonStyle}>
                <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
                  <DialogTrigger asChild>
                    <Copy size="20" />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogTitle className="text-center">テンプレートのコピー作成</DialogTitle>
                    <DialogDescription className="text-center">
                      コピーした名前を編集して保存開始してください
                    </DialogDescription>
                    <MedicalCareTemplateCopyForm
                      template={t}
                      closeDialog={() => setIsCopyDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </li>
              <li className={buttonStyle}>
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Trash2 size="20" />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>テンプレートの削除</DialogTitle>
                    </DialogHeader>
                    <div className="border p-2 rounded">
                      <p className="text-lg font-bold">{t.symptom}</p>
                      {<DepartmentCount procedures={t.procedures} />}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        削除を取りやめる
                      </Button>
                      <Button onClick={handleDelete}>削除を実行する</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>

          <DepartmentCount procedures={t.procedures} />
        </div>

        <div className="bg-muted p-4 space-y-4">
          <div className="flex justify-center">
            <button onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
              {isAccordionOpen ? (
                <ChevronsUp className="size-6" />
              ) : (
                <ChevronsDown className="size-6" />
              )}
            </button>
          </div>

          {isAccordionOpen && (
            <div className="space-y-4 bg-muted">
              <DepartmentTabs
                procedures={t.procedures}
                current={selectedDept}
                onChange={setSelectedDept}
              />

              <ul className="flex flex-wrap gap-2">
                {t.procedures
                  .filter((p) => selectedDept === '' || p.department === selectedDept)
                  .map((procedure: Procedure, idx: number) => (
                    <li key={idx} className="">
                      <p className="text-sm truncate">{procedure.label}</p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
