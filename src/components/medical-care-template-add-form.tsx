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
import { useRouter } from 'next/navigation';

type FormValues = {
  id: string;
  label: string;
};

export function MedicalCareTemplateAddForm() {
  const router = useRouter();
  const { data: tmpls, isPending, isError } = useGetMedicalCareTemplates();

  const form = useForm<FormValues>({
    defaultValues: {
      id: uuidv4(),
      label: '',
    },
  });

  const { mutate } = useCreateMedicalCareTemplate();

  // フォム送信時の処理
  const onSubmit = async (data: FormValues) => {
    const newTemplate: TablesInsert<'medical_care_templates'> = {
      id: data.id,
      symptom: data.label,
      procedures: [],
    };

    await mutate({ newTemplate });
    toast.info('テンプレートを作成しました');

    form.reset();
    router.push(`/medical_care_templates/details?id=${data.id}`);
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
              新規に作成する
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
