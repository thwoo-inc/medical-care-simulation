'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TablesInsert } from '@/lib/database.types';
import { v4 as uuidv4 } from 'uuid';
import {
  useCreateMedicalCareTemplate,
  useGetMedicalCareTemplates,
} from '@/service/medical-care-template';
import Spinner from '@/components/spinner';
import { toast } from 'sonner';

type FormValues = {
  id: string;
  srcLabel: string;
  label: string;
};

export function MedicalCareTemplateEditForm({
  template,
  closeDialog,
}: {
  template: TablesInsert<'medical_care_templates'>;
  closeDialog: () => void;
}) {
  const { data: tmpls, isPending, isError } = useGetMedicalCareTemplates();

  const form = useForm<FormValues>({
    defaultValues: {
      id: uuidv4(),
      srcLabel: template.symptom,
      label: `${template.symptom}のコピー`,
    },
  });

  const { mutate } = useCreateMedicalCareTemplate();

  // フォム送信時の処理
  const onSubmit = async (data: FormValues) => {
    const newTemplate: TablesInsert<'medical_care_templates'> = Object.assign({}, template, {
      id: data.id,
      symptom: data.label,
    });

    await mutate({ newTemplate });
    toast.info('テンプレートをコピーしました');

    form.reset();
    // router.push(`/medical_care_templates/`);
    closeDialog();
  };

  return (
    <>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && tmpls && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="srcLabel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>コピー元のテンプレート</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>症例ラベル</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-center w-full"
              disabled={form.getValues().label === ''}
            >
              コピーを作成する
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
