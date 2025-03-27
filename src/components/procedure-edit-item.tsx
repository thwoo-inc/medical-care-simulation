'use client';

import { DepartmentSpan } from '@/components/department-icon';
import { ProcedureEditForm } from '@/components/procedure-edit-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateMedicalCareTemplate } from '@/service/medical-care-template';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import {
  generateId,
  Procedure,
  RecordType,
  recordTypeLabel,
  sortProcedures,
} from '@/types/procedure';
import { Copy, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ProcedureEditItem({
  template,
  proc,
}: {
  template: MedicalCareTemplate;
  proc: Procedure;
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const buttonStyle = 'p-2 shadow border rounded flex items-center justify-center w-10 h-10';

  const { mutate: mutateUpdate } = useUpdateMedicalCareTemplate();

  const handleEdit = async (proc: Procedure) => {
    // idが一致するものを差し替えてsort
    const newProcedures = sortProcedures(
      template.procedures.map((p) => (p.id === proc.id ? proc : p)),
    );
    mutateUpdate({ id: template.id, updates: { procedures: newProcedures } });
    setIsEditDialogOpen(false);
  };

  const handleCopy = async (proc: Procedure) => {
    // 追加してsort
    const newProcedures = sortProcedures([...template.procedures, proc]);
    mutateUpdate({ id: template.id, updates: { procedures: newProcedures } });
    setIsCopyDialogOpen(false);
  };

  const handleDelete = async (proc: Procedure) => {
    // idが一致するものを削除、念のためsort
    const newProcedures = sortProcedures(template.procedures.filter((p) => p.id !== proc.id));
    mutateUpdate({ id: template.id, updates: { procedures: newProcedures } });
    setIsDeleteDialogOpen(false);
  };

  return (
    <div key={proc.label} className="p-2 space-y-2 border-2 rounded w-full h-full">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap gap-2 items-center">
            <p className="space-x-2 text-sm">
              {<DepartmentSpan department={proc.department} />}
              <span className="text-xs">
                {proc.step}-{proc.step_order}
              </span>
            </p>
            <p className="font-bold text-lg">{proc.label}</p>
            <p className="px-1 border rounded text-sm bg-muted">
              {recordTypeLabel(proc.record_type as RecordType)}
            </p>
          </div>
          <p>{proc.details}</p>
        </div>
        <ul className="flex gap-2">
          <li className={buttonStyle}>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Edit size="20" />
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogTitle className="text-center">処置の編集更新</DialogTitle>
                <ProcedureEditForm
                  src={proc}
                  update={(proc) => {
                    handleEdit(proc);
                  }}
                />
              </DialogContent>
            </Dialog>
          </li>
          <li className={buttonStyle}>
            <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
              <DialogTrigger asChild>
                <Copy size="20" />
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogTitle className="text-center">処置のコピー追加</DialogTitle>
                {/* IDは生成してラベルはコピーっぽくしておく */}
                <ProcedureEditForm
                  src={Object.assign({}, proc, {
                    id: generateId(),
                    label: `${proc.label}のコピー`,
                  })}
                  update={(proc) => {
                    handleCopy(proc);
                  }}
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
                  <DialogTitle>処置の削除</DialogTitle>
                </DialogHeader>
                <div className="p-2 space-y-2 border rounded">
                  <p className="font-bold text-lg">{proc.label}</p>
                  <p>{proc.details}</p>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    削除を取りやめる
                  </Button>
                  <Button onClick={() => handleDelete(proc)}>削除を実行する</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </div>
    </div>
  );
}
