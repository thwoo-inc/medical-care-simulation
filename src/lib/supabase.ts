import { Database, Tables } from '@/lib/database.types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type TypedSupabaseClient = SupabaseClient<Database>;

export const fetchMedicalcareTemplates = async (): Promise<
  Tables<'medical_care_templates'>[] | null
> => {
  const { data, error } = await supabase.from('medical_care_templates').select('*');

  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }

  return data;
};

// const userSessionsQuery = supabase.from('session_participants').select(`
//       sessions (
//         id,
//         mode,
//         question_count,
//         time_limit,
//         start_time,
//         end_time,
//         current_question_index,
//         current_word_index,
//         current_character_index,
//         current_player_id,
//         created_at,
//         updated_at
//       )
//     `);

// export type UserSessions = QueryData<typeof userSessionsQuery>;

// export const fetchUserSessionsByUserId = async (userId: string): Promise<UserSessions | null> => {
//   const { data, error } = await userSessionsQuery.eq('user_id', userId);
//   // .order('sessions.start_time');
//   // .lt('sessions.start_time', new Date().toISOString());

//   if (error) {
//     console.error('Error fetching sessions:', error);
//     return [];
//   }

//   return data;
// };
