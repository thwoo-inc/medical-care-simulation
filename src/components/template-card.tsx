import { DepartmentTabs } from '@/components/department-tabs';
import { Card } from '@/components/ui/card';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { Department, DepartmentObstetrics, departmentOrders } from '@/types/department';
import { Procedure } from '@/types/procedure';
import React, { useMemo, useState } from 'react';
import { ChevronsDown, ChevronsUp, Copy, Edit, Trash2 } from 'lucide-react';
import { DepartmentSpan } from '@/components/department-icon';
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
import { MedicalCareTemplateEditForm } from '@/components/medical-care-template-edit-form';

export default function TemplateCard({ t }: { t: MedicalCareTemplate }) {
  const [selectedDept, setSelectedDept] = useState(DepartmentObstetrics);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: mutateDelete } = useDeleteMedicalCareTemplate();

  const departmentCounts = useMemo(() => {
    return departmentOrders.reduce((acc, dept) => {
      const count = t.procedures.filter((p) => p.department === dept).length;
      if (count > 0) acc[dept] = count;
      return acc;
    }, {} as Record<string, number>);
  }, [t.procedures]);

  const handleDelete = async () => {
    await mutateDelete({ id: t.id });
    toast.success('テンプレートを削除しました');
  };

  return (
    <>
      {' '}
      <Card key={t.id} className="bg shadow flex flex-col w-full">
        <div className="p-4">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-xl font-bold my-2">{t.symptom}</h2>
            <ul className="flex gap-4">
              <li className="p-2 bg-muted rounded">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Edit size="24" />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogTitle className="text-center">テンプレートの編集</DialogTitle>
                    <DialogDescription className="text-center">
                      名称と処置を更新してください
                    </DialogDescription>
                    <MedicalCareTemplateEditForm
                      template={t}
                      closeDialog={() => setIsEditDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </li>
              <li className="p-2 bg-muted rounded">
                <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
                  <DialogTrigger asChild>
                    <Copy size="24" />
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
              <li className="p-2 bg-muted rounded">
                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Trash2 size="24" />
                  </DialogTrigger>
                  <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                      <DialogTitle>テンプレートの削除</DialogTitle>
                    </DialogHeader>
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
          <div className="flex flex-wrap gap-2 my-2">
            {Object.entries(departmentCounts).map(([dept, count]) => (
              <p key={dept} className="flex items-center gap-1 text-sm">
                {<DepartmentSpan department={dept as Department} />}
                <span>{count}件</span>
              </p>
            ))}
          </div>
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
