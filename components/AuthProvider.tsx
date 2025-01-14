'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const signInAnonymously = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(`getSession error: ${error}`);
      }

      // セッションが存在しない場合、匿名認証を実行
      if (!session) {
        const { error } = await supabase.auth.signInWithOtp({
          email: `${crypto.randomUUID()}@anonymous.com`,
          options: {
            data: {
              anonymous: true,
            },
          },
        });
        if (error) console.error('Anonymous auth error:', error);
      }
    };

    signInAnonymously();
  }, []);

  return <>{children}</>;
}
