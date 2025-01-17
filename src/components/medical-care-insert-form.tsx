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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { insertMedicalCare } from '@/queries/insert-medical-care';
import { useMedicalCareTemplateAll } from '@/hooks/use-medical-care-template-query';
import { useQuery } from '@tanstack/react-query';
import { TablesInsert } from '@/lib/database.types';
import { useRouter } from 'next/navigation';

type FormValues = {
  symptomId: string;
  label: string;
  id: string;
};

export function MedicalCareInsertForm() {
  const router = useRouter();
  const {
    data: templates,
    isLoading,
    isError,
  } = useQuery({
    ...useMedicalCareTemplateAll({ client: supabase }),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      symptomId: '',
      label: '',
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  // symptomが選択されたときの処理
  const onSymptomChange = (symptomId: string) => {
    if (!templates) {
      return;
    }

    const template = templates.find((t) => t.id === symptomId);
    if (template) {
      const now = new Date();
      const timestamp = now.toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      form.setValue('label', `${template.symptom} ${timestamp}`, {
        shouldValidate: true,
      });
      form.setValue('id', formatDateToTimestamp(now));
    }
  };

  // フォム送信時の処理
  const onSubmit = (data: FormValues) => {
    if (!templates) {
      return;
    }
    const template = templates.find((t) => t.id === data.symptomId);
    if (!template) {
      return;
    }

    console.log(`id: ${data.id}, label: ${data.label} `);
    const care: TablesInsert<'medical_cares'> = Object.assign({}, template, {
      id: data.id,
      label: data.label,
    });

    insertMedicalCare(supabase, care).then((result) => {
      if (result.error) {
        console.error(`insertMedicalCare error: ${result.error}`);
        return;
      }
      console.log('insertMedicalCare success');
      form.reset();

      router.push(`/medical_cares/details?id=${data.id}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="symptomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>テンプレート</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onSymptomChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="テンプレートを選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {templates &&
                    templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.symptom}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>識別ラベル</FormLabel>
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
          disabled={form.getValues().symptomId === '' || form.getValues().label === ''}
        >
          シミュレーションを開始する
        </Button>
      </form>
    </Form>
  );
}

const formatDateToTimestamp = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};
