import { TypedSupabaseClient } from '@/lib/supabase';
import {
  useQuery as originUseQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { useEffect } from 'react';

export const MEDICAL_CARES_KEYS = {
  all: ['medical-cares'] as const,
  inProgress: () => [...MEDICAL_CARES_KEYS.all, 'in-progress'] as const,
  finished: () => [...MEDICAL_CARES_KEYS.all, 'finished'] as const,
  detail: (id: string) => [...MEDICAL_CARES_KEYS.all, 'detail', id] as const,
};

export function selectMedicalCaresInProgress(client: TypedSupabaseClient) {
  return client.from('medical_cares').select('*').is('finished_at', null).throwOnError();
}
// export function useMedicalCaresInProgress(client: TypedSupabaseClient) {
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: MEDICAL_CARES_KEYS.inProgress(),
//     queryFn: () => selectMedicalCaresInProgress(client),
//     onSuccess: () => {
//       // リアルタイムサブスクリプションの設定
//       const subscription = client
//         .channel('medical_cares_in_progress')
//         .on('postgres_changes', { event: '*', schema: 'public', table: 'medical_cares' }, () => {
//           // データが変更されたら再フェッチ
//           queryClient.invalidateQueries({ queryKey: MEDICAL_CARES_KEYS.inProgress() });
//         })
//         .subscribe();

//       // クリーンアップ関数
//       return () => {
//         subscription.unsubscribe();
//       };
//     },
//   });
// }

// export function invalidateMedicalCaresInProgress() {}

export function selectMedicalCaresFinished(client: TypedSupabaseClient) {
  return client.from('medical_cares').select('*').not('finished_at', 'is', null).throwOnError();
}
// export function useMedicalCaresFinished(client: TypedSupabaseClient) {
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: MEDICAL_CARES_KEYS.finished(),
//     queryFn: () => selectMedicalCaresFinished(client),
//     onSuccess: () => {
//       const subscription = client
//         .channel('medical_cares_finished')
//         .on('postgres_changes', { event: '*', schema: 'public', table: 'medical_cares' }, () => {
//           queryClient.invalidateQueries({ queryKey: MEDICAL_CARES_KEYS.finished() });
//         })
//         .subscribe();

//       return () => {
//         subscription.unsubscribe();
//       };
//     },
//   });
// }

export function getMedicalCare(client: TypedSupabaseClient, id: string) {
  return client.from('medical_cares').select('*').eq('id', id).single().throwOnError();
}

export function useMedicalCareSync(client: TypedSupabaseClient, id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: MEDICAL_CARES_KEYS.detail(id),
    queryFn: () => getMedicalCare(client, id),
    onSuccess: () => {
      // データフェッチ完了後（成功・失敗に関わらず）にサブスクリプションを設定
      const subscription = client
        .channel(`medical_care_${id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'medical_cares',
            filter: `id=eq.${id}`,
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: MEDICAL_CARES_KEYS.detail(id),
            });
          },
        )
        .subscribe();

      // コンポーネントのアンマウント時にサブスクリプションを解除
      return () => {
        subscription.unsubscribe();
      };
    },
  });
}

export type QueryCallbacks<TData, TError = unknown> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data?: TData, error?: TError) => void;
};

export const useQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  params: UseQueryOptions<TQueryFnData, TError, TData> & QueryCallbacks<TData, TError>,
): UseQueryResult<TData, TError> => {
  const { onSuccess, onError, onSettled, ...queryParameters } = params;
  const result = originUseQuery<TQueryFnData, TError, TData>(queryParameters);

  useEffect(() => {
    if (result.isSuccess && onSuccess) {
      onSuccess(result.data);
    }
    if (result.isError && onError) {
      onError(result.error);
    }
    onSettled?.(result.data, result.error || undefined);
  }, [result.isSuccess, result.isError, result.data, result.error, onSuccess, onError, onSettled]);

  return result;
};
