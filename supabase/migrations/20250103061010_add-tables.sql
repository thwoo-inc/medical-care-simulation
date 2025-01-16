-- 医療テンプレート
CREATE TABLE medical_care_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symptom TEXT NOT NULL,
    procedures JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE medical_care_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY permit_authenticated_read ON medical_care_templates FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY permit_authenticated_insert ON medical_care_templates FOR INSERT TO authenticated WITH CHECK (TRUE);
CREATE POLICY permit_authenticated_update ON medical_care_templates FOR UPDATE TO authenticated WITH CHECK (TRUE);
CREATE POLICY permit_authenticated_delete ON medical_care_templates FOR DELETE TO authenticated USING (TRUE);

-- 医療
CREATE TABLE medical_cares (
    id TEXT PRIMARY KEY,
    symptom TEXT NOT NULL,
    label TEXT NOT NULL,
    procedures JSONB,
    created_at TIMESTAMP DEFAULT now(),
    started_at TIMESTAMP DEFAULT now(),
    finished_at TIMESTAMP
);

ALTER TABLE medical_cares ENABLE ROW LEVEL SECURITY;
CREATE POLICY permit_authenticated_read ON medical_cares FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY permit_authenticated_insert ON medical_cares FOR INSERT TO authenticated WITH CHECK (TRUE);
CREATE POLICY permit_authenticated_update ON medical_cares FOR UPDATE TO authenticated WITH CHECK (TRUE);
CREATE POLICY permit_authenticated_delete ON medical_cares FOR DELETE TO authenticated USING (TRUE);
