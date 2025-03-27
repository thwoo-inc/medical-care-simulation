'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Procedure } from '@/types/procedure';
import { departmentOrders } from '@/types/procedure';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // 必要なコンポーネントをインポート

export function ProcedureEditForm({
  src,
  update,
}: {
  src: Procedure;
  update: (procedure: Procedure) => void;
}) {
  const form = useForm<Procedure>({
    defaultValues: src,
  });

  // フォム送信時の処理
  const onSubmit = async (data: Procedure) => {
    update(data);
    toast.info('テンプレートを保存しました');
  };

  const itemStyle = 'flex items-center gap-4';
  const labelStyle = 'w-1/4 text-right mt-2';
  const controleStyle = 'w-3/4';

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>診療科/担当</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className={controleStyle}>
                    <SelectTrigger className="shrink-0">
                      <SelectValue placeholder="診療科/担当を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departmentOrders.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="step"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>ステップ</FormLabel>
                <FormControl className={controleStyle}>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="step_order"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>ステップ内順序</FormLabel>
                <FormControl className={controleStyle}>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>行動/処置</FormLabel>
                <FormControl className={controleStyle}>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>補足情報</FormLabel>
                <FormControl className={controleStyle}>
                  <Textarea rows={3} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="record_type"
            render={({ field }) => (
              <FormItem className={itemStyle}>
                <FormLabel className={labelStyle}>記録タイプ</FormLabel>
                <FormControl className={controleStyle}>
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex">
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="done" id="done" />
                      <label htmlFor="done" className="text-sm">
                        実施のみ記録
                      </label>
                    </div>
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="start_finish" id="start_finish" />
                      <label htmlFor="start_finish" className="text-sm">
                        開始/終了の記録
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-center w-full mt-8"
            disabled={
              form.getValues().department.toString() === '' ||
              form.getValues().step <= 0 ||
              form.getValues().step_order < 0 ||
              form.getValues().label === '' ||
              form.getValues().record_type?.toString() === ''
            }
          >
            保存する
          </Button>
        </form>
      </Form>
    </>
  );
}
