'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { z } from 'zod';
import { type Database } from '@/lib/database.types';

// Zodスキーマの定義
const formSchema = z.object({
  symptomId: z.string({
    required_error: '症状を選択してください',
  }),
  note: z.string().min(1, 'メモを入力してください'),
});

type FormValues = z.infer<typeof formSchema>;
type Template = Database['public']['Tables']['medical_care_templates']['Row'];

export function MedicalCareInsertForm() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomId: '',
      note: '',
    },
  });

  // テンプレートデタの取得
  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from('medical_care_templates').select('id, symptom');
      if (error) {
        console.error(`fetchTemplates error: ${error}`);
      }
      if (data) setTemplates(data);
    };
    fetchTemplates();
  }, []);

  // symptomが選択されたときの処理
  const onSymptomChange = (symptomId: string) => {
    const template = templates.find((t) => t.id === symptomId);
    if (template) {
      const timestamp = new Date().toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      form.setValue('note', `${template.symptom} ${timestamp}`, {
        shouldValidate: true,
      });
    }
  };

  // フォム送信時の処理
  const onSubmit = async (data: FormValues) => {
    const { error } = await supabase.from('medical_cares').insert([
      {
        symptom_id: data.symptomId,
        note: data.note,
      },
    ]);
    if (!error) {
      // 成功時の処理
      form.reset();
      // TODO: ダイアログを閉じる処理を追加
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="symptomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>症状</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onSymptomChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="症状を選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {templates.map((template) => (
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
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メモ</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">登録</Button>
      </form>
    </Form>
  );
}
