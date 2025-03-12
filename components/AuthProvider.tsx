'use client';

import { createContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

export type AuthUser = {
  session: Session;
};

interface AuthContextType {
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const signInAnonymously = async () => {
      console.log('AuthProvider getSession()');
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(`AuthProvider getSession() error: ${error}`);
        return;
      }

      if (session) {
        console.log('AuthProvider getSession() already signed in');
        setUser({ session });
      } else {
        // セッションが存在しない場合、匿名認証を実行
        console.log('AuthProvider getSession() not signed in');
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error(`signInAnonymously error: ${error}`);
        } else if (data.session) {
          console.log('signInAnonymously success');
          setUser({ session: data.session });
        } else {
          console.error('signInAnonymously data is null');
        }
      }
    };

    signInAnonymously();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within a AuthProvider');
//   }
//   return context;
// };
