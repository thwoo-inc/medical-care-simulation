export const medicalCareKeys = {
  all: ['medical-cares'] as const,
  lists: () => [...medicalCareKeys.all, 'list'] as const,
  listsInProgress: () => [...medicalCareKeys.lists(), 'in-progress'] as const,
  listsFinished: () => [...medicalCareKeys.lists(), 'finished'] as const,
  details: () => [...medicalCareKeys.all, 'detail'] as const,
  detail: (id: string) => [...medicalCareKeys.details(), id] as const,
} as const;
