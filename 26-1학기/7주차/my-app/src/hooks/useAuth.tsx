import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { mapAuthErrorMessage, validateAuthEmail, validateSignUpPassword } from '../utils/validation';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  email: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: string | null; info?: string }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const trimmedEmail = email.trim();
    const emailError = validateAuthEmail(trimmedEmail);
    if (emailError) return { error: emailError };

    const passwordError = validateSignUpPassword(password);
    if (passwordError) return { error: passwordError };

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
    });

    if (error) {
      return { error: mapAuthErrorMessage(error.message) };
    }

    // 이미 가입된 이메일인데 에러 없이 응답하는 경우
    if (data.user?.identities?.length === 0) {
      return { error: '이미 가입된 이메일입니다. 로그인 탭에서 로그인해 주세요.' };
    }

    if (data.session) {
      setSession(data.session);
      return { error: null };
    }

    // Confirm email ON → 세션 없음, 메일 확인 필요
    if (data.user && !data.session) {
      return {
        error: null,
        info: '확인 메일을 보냈습니다. 메일의 링크를 연 뒤 로그인 탭에서 로그인해 주세요. (개발 중이라면 Supabase에서 Confirm email을 OFF로 바꾸세요.)',
      };
    }

    // Confirm email OFF인데 세션이 없으면 자동 로그인 시도
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });

    if (signInError) {
      return {
        error:
          '가입 요청은 처리되었을 수 있습니다. 로그인 탭에서 같은 이메일·비밀번호로 로그인해 보세요.',
      };
    }

    if (signInData.session) {
      setSession(signInData.session);
    }

    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const emailError = validateAuthEmail(email);
    if (emailError) return { error: emailError };
    if (!password) return { error: '비밀번호를 입력해 주세요.' };

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) {
      return { error: mapAuthErrorMessage(error.message) };
    }
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      email: session?.user.email ?? null,
      loading,
      isAuthenticated: Boolean(session?.user),
      signUp,
      signIn,
      signOut,
    }),
    [session, loading, signUp, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  }
  return context;
}
