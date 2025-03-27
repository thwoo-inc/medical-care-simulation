'use client';

import { Button } from '@/components/ui/button';
import { TablesUpdate } from '@/lib/database.types';

import { toast } from 'sonner';
import { MedicalCareTemplate } from '@/service/medical-care-template/type';
import { useUpdateMedicalCareTemplate } from '@/service/medical-care-template';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DepartmentCount from '@/components/department-count';

type FormValues = {
  symptom: string;
};

export default function MedicalCareTemplateHeader({ template }: { template: MedicalCareTemplate }) {
  const form = useForm<FormValues>({
    defaultValues: {
      symptom: template.symptom,
    },
  });

  const { mutate: mutateUpdate } = useUpdateMedicalCareTemplate();

  // 医療の更新
  const onSubmit = async (data: FormValues) => {
    const updates: TablesUpdate<'medical_cares'> = {
      symptom: data.symptom,
    };
    mutateUpdate({ id: template.id, updates });
    toast.success('テンプレートを更新しました');
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[480px] space-y-4 w-full py-8">
      <h1 className="flex text-2xl font-bold items-center gap-2">
        テンプレート編集
        <Edit />
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between w-full gap-4">
          <FormField
            control={form.control}
            name="symptom"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shrink-0"
            disabled={form.getValues().symptom === template.symptom}
          >
            更新
          </Button>
        </form>
      </Form>
      <DepartmentCount procedures={template.procedures} isShowZero={true} />
    </div>
  );
}
