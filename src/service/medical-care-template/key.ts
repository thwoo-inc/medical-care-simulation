export const medicalCareTemplateKeys = {
  all: ['medical-care-templates'] as const,
  lists: () => [...medicalCareTemplateKeys.all, 'list'] as const,
  details: () => [...medicalCareTemplateKeys.all, 'detail'] as const,
  detail: (id: string) => [...medicalCareTemplateKeys.details(), id] as const,
} as const;
