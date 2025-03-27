'use client';

import { ProcedureEditForm } from '@/components/procedure-edit-form';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateMedicalCareTemplate } from '@/service/medical-care-template';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import {
  Department,
  generateId,
  Procedure,
  RecordTypeDone,
  sortProcedures,
} from '@/types/procedure';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function ProcedureAddItem({
  template,
  department,
  step,
}: {
  template: MedicalCareTemplate;
  department: string;
  step: number;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const buttonStyle = 'p-2 shadow border rounded flex items-center justify-center w-10 h-10';

  const { mutate: mutateUpdate } = useUpdateMedicalCareTemplate();

  const handleAdd = async (proc: Procedure) => {
    console.log('handleAdd');
    // 追加してsort
    const newProcedures = sortProcedures([...template.procedures, proc]);
    mutateUpdate({ id: template.id, updates: { procedures: newProcedures } });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="p-2 rounded w-full h-full">
      <div className="flex justify-center items-center gap-4">
        <div className={buttonStyle}>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Plus size="24" />
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle className="text-center">処置の新規追加</DialogTitle>
              <ProcedureEditForm
                src={{
                  id: generateId(),
                  department: department as Department,
                  step,
                  step_order: 0,
                  label: '',
                  details: '',
                  record_type: RecordTypeDone,
                }}
                update={(proc) => {
                  handleAdd(proc);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
