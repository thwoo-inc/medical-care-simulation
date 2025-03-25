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
import { TablesUpdate } from '@/lib/database.types';
import { useUpdateMedicalCare } from '@/service/medical-care';
import { useGetMedicalCareTemplates } from '@/service/medical-care-template';
import Spinner from '@/components/spinner';
import { toast } from 'sonner';
import { MedicalCare } from '@/service/medical-care/type';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

type FormValues = {
  memo: string;
};

export function MedicalCareMemoForm({ care }: { care: MedicalCare }) {
  const [prevMemo, setPrevMemo] = useState(care.memo);

  const { data: tmpls, isPending, isError } = useGetMedicalCareTemplates();

  const form = useForm<FormValues>({
    defaultValues: {
      memo: care.memo,
    },
  });

  const { mutate } = useUpdateMedicalCare();

  // フォム送信時の処理
  const onSubmit = async (data: FormValues) => {
    const updates: TablesUpdate<'medical_cares'> = {
      memo: data.memo,
    };

    await mutate({ id: care.id, updates });
    toast.info('振り返りメモを更新しました');

    setPrevMemo(data.memo);
  };

  return (
    <>
      {isPending && <Spinner />}
      {isError && <p className="text-red-500">エラーが発生しました。</p>}
      {!isPending && !isError && tmpls && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>振り返りメモ</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={10} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="inline-block"
              disabled={form.getValues().memo === prevMemo}
            >
              メモを更新する
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
