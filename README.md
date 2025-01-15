# medical-care-simulation

keep current data to reset

```sql
pg_dump -h localhost -p 54322 -d postgres -U postgres \
--table='auth.users' \
--table='medical_care_templates' \
--table='medical_cares' \
--data-only \
--inserts > supabase/seed.sql
```

restart with storage files

```shell
npx supabase@beta db start
npx supabase@beta db reset
```

```shell
supabase gen types typescript --local > src/lib/database.types.ts
npx supabase-to-zod --input src/lib/database.types.ts --output src/lib/zod.types.ts
```
