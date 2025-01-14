// Generated by ts-to-zod
import { z } from "zod";
import { Json } from "./database.types";

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
);

export const medicalCareTemplatesRowSchema = z.object({
  created_at: z.string().nullable(),
  id: z.string(),
  procedures: jsonSchema,
  symptom: z.string(),
});

export const medicalCareTemplatesInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  procedures: jsonSchema,
  symptom: z.string(),
});

export const medicalCareTemplatesUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  procedures: jsonSchema.optional(),
  symptom: z.string().optional(),
});

export const medicalCareTemplatesRelationshipsSchema = z.tuple([]);

export const medicalCaresRowSchema = z.object({
  created_at: z.string().nullable(),
  finished_at: z.string().nullable(),
  id: z.string(),
  label: z.string(),
  procedures: jsonSchema.nullable(),
  started_at: z.string().nullable(),
  symptom: z.string(),
});

export const medicalCaresInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  finished_at: z.string().optional().nullable(),
  id: z.string().optional(),
  label: z.string(),
  procedures: jsonSchema.optional().nullable(),
  started_at: z.string().optional().nullable(),
  symptom: z.string(),
});

export const medicalCaresUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  finished_at: z.string().optional().nullable(),
  id: z.string().optional(),
  label: z.string().optional(),
  procedures: jsonSchema.optional().nullable(),
  started_at: z.string().optional().nullable(),
  symptom: z.string().optional(),
});

export const medicalCaresRelationshipsSchema = z.tuple([]);
