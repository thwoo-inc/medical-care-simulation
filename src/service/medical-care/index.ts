import { useAuth } from '@/hooks/use-auth';
import { TablesInsert, TablesUpdate } from '@/lib/database.types';
import {
  createMedicalCare,
  deleteMedicalCare,
  getMedicalCare,
  getMedicalCaresFinished,
  getMedicalCaresInProgress,
  updateMedicalCare,
} from '@/service/medical-care/function';
import { medicalCareKeys } from '@/service/medical-care/key';
import { getMedicalCareSelector, getMedicalCaresSelector } from '@/service/medical-care/selector';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMedicalCaresInProgress = () => {
  const auth = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: medicalCareKeys.listsInProgress(),
    queryFn: async () => {
      const response = await getMedicalCaresInProgress();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    select: getMedicalCaresSelector,
    enabled: !!auth.session,
  });

  return {
    data,
    isPending,
    isError,
  };
};

export const useGetMedicalCaresFinished = () => {
  const auth = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: medicalCareKeys.listsFinished(),
    queryFn: async () => {
      const response = await getMedicalCaresFinished();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    select: getMedicalCaresSelector,
    enabled: !!auth.session,
  });

  return {
    data,
    isPending,
    isError,
  };
};

export const useGetMedicalCare = (id: string) => {
  const auth = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: medicalCareKeys.detail(id),
    queryFn: async () => {
      const response = await getMedicalCare(id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    select: getMedicalCareSelector,
    enabled: !!auth.session,
  });

  return {
    data,
    isPending,
    isError,
  };
};

export const useCreateMedicalCare = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (variables: { newCare: TablesInsert<'medical_cares'> }) =>
      createMedicalCare(variables.newCare),
    onSuccess: (data) => {
      console.log('create success: ', data);
      queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsInProgress() });
      queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsFinished() });
    },
  });

  return { mutate };
};

export const useUpdateMedicalCare = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (variables: { id: string; updates: Partial<TablesUpdate<'medical_cares'>> }) =>
      updateMedicalCare(variables.id, variables.updates),
    onSuccess: (data, variables) => {
      console.log('update success id: ', variables.id);
      queryClient.invalidateQueries({ queryKey: medicalCareKeys.detail(variables.id) });
      if ('finished_at' in variables.updates) {
        console.log('update key finished_at');
        queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsInProgress() });
        queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsFinished() });
      }
    },
  });

  return { mutate };
};

export const useDeleteMedicalCare = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (variables: { id: string }) => {
      const response = await deleteMedicalCare(variables.id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    }, // deleteMedicalCare関数を呼び出す
    onSuccess: (data, id) => {
      console.log('delete success id: ', id);
      queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsInProgress() });
      queryClient.invalidateQueries({ queryKey: medicalCareKeys.listsFinished() });
    },
  });

  return { mutate };
};
