import { useAuth } from '@/hooks/use-auth';
import { getMedicalCareTemplates } from '@/service/medical-care-template/function';
import { medicalCareTemplateKeys } from '@/service/medical-care-template/key';
import { getMedicalCareTemplatesSelector } from '@/service/medical-care-template/selector';
import { useQuery } from '@tanstack/react-query';

export const useGetMedicalCareTemplates = () => {
  const auth = useAuth();

  const { data, isPending, isError, error } = useQuery({
    queryKey: medicalCareTemplateKeys.lists(),
    queryFn: async () => {
      const response = await getMedicalCareTemplates();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    select: getMedicalCareTemplatesSelector,
    enabled: !!auth.session,
  });

  return {
    data,
    isPending,
    isError,
    error,
  };
};

// export const useGetMedicalCareTemplate = (id: string) => {
//   const auth = useAuth();

//   const { data, isPending, isError } = useQuery({
//     queryKey: medicalCareTemplateKeys.detail(id),
//     queryFn: async () => {
//       const response = await getMedicalCareTemplateTemplate(id);
//       if (response.error) {
//         throw new Error(response.error.message);
//       }
//       return response.data;
//     },
//     select: getMedicalCareTemplateTemplateSelector,
//     enabled: !!auth.session,
//   });

//   return {
//     data,
//     isPending,
//     isError,
//   };
// };

// export const useCreateMedicalCareTemplate = () => {
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: (variables: { newCare: TablesInsert<'medical_cares'> }) =>
//       createMedicalCareTemplate(variables.newCare),
//     onSuccess: (data) => {
//       console.log('create success: ', data);
//       queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsInProgress() });
//       queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsFinished() });
//     },
//   });

//   return { mutate };
// };

// export const useUpdateMedicalCareTemplate = () => {
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: (variables: { id: string; updates: Partial<TablesUpdate<'medical_cares'>> }) =>
//       updateMedicalCareTemplate(variables.id, variables.updates),
//     onSuccess: (data, variables) => {
//       console.log('update success id: ', variables.id);
//       queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.detail(variables.id) });
//       if ('finished_at' in variables.updates) {
//         console.log('update key finished_at');
//         queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsInProgress() });
//         queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsFinished() });
//       }
//     },
//   });

//   return { mutate };
// };

// export const useDeleteMedicalCareTemplate = () => {
//   const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: async (variables: { id: string }) => {
//       const response = await deleteMedicalCareTemplate(variables.id);
//       if (response.error) {
//         throw new Error(response.error.message);
//       }
//       return response.data;
//     }, // deleteMedicalCareTemplate関数を呼び出す
//     onSuccess: (data, id) => {
//       console.log('delete success id: ', id);
//       queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsInProgress() });
//       queryClient.invalidateQueries({ queryKey: medicalCareTemplateKeys.listsFinished() });
//     },
//   });

//   return { mutate };
// };
