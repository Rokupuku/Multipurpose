import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { formToLionInsert, rowToLion, rowsToLions } from '../data/lions';
import { supabase } from '../lib/supabase';
import type { Lion } from '../types/lion';
import type { LionFormData } from '../types/lion';
import { fetchRandomUserProfiles, randomUserToLionInsert } from '../utils/lions';

interface LionsContextValue {
  lions: Lion[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addLionFromForm: (form: LionFormData) => Promise<void>;
  addRandomLions: (count: number) => Promise<void>;
  removeLastLion: () => Promise<void>;
  findLion: (id: string | undefined) => Lion | undefined;
}

const LionsContext = createContext<LionsContextValue | null>(null);

export function LionsProvider({ children }: { children: ReactNode }) {
  const [lions, setLions] = useState<Lion[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLions = useCallback(async () => {
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('lions')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw new Error(fetchError.message);
    }

    setLions(rowsToLions(data ?? []));
  }, []);

  const refresh = useCallback(async () => {
    setActionLoading(true);
    setError(null);
    try {
      await fetchLions();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.';
      setError(message);
    } finally {
      setActionLoading(false);
    }
  }, [fetchLions]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        await fetchLions();
      } catch (err: unknown) {
        if (mounted) {
          const message = err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.';
          setError(message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchLions]);

  const addLionFromForm = useCallback(
    async (form: LionFormData) => {
      setActionLoading(true);
      setError(null);
      try {
        const insert = formToLionInsert(form);
        const { data, error: insertError } = await supabase
          .from('lions')
          .insert(insert)
          .select('*')
          .single();

        if (insertError) throw new Error(insertError.message);
        if (data) {
          setLions((prev) => [rowToLion(data), ...prev]);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '추가에 실패했습니다.';
        setError(message);
        throw err;
      } finally {
        setActionLoading(false);
      }
    },
    []
  );

  const addRandomLions = useCallback(async (count: number) => {
    setActionLoading(true);
    setError(null);
    try {
      const users = await fetchRandomUserProfiles(count);
      const inserts = users.map((user) => randomUserToLionInsert(user));
      const { data, error: insertError } = await supabase.from('lions').insert(inserts).select('*');

      if (insertError) throw new Error(insertError.message);
      if (data) {
        const added = rowsToLions(data);
        setLions((prev) => [...added, ...prev]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '랜덤 추가에 실패했습니다.';
      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const removeLastLion = useCallback(async () => {
    if (!lions.length) return;
    const last = [...lions].sort((a, b) => b.createdAt - a.createdAt)[0];
    if (!last) return;

    setActionLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await supabase.from('lions').delete().eq('id', last.id);
      if (deleteError) throw new Error(deleteError.message);
      setLions((prev) => prev.filter((lion) => lion.id !== last.id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다.';
      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [lions]);

  const findLion = useCallback(
    (id: string | undefined) => lions.find((lion) => lion.id === id),
    [lions]
  );

  const value = useMemo(
    () => ({
      lions,
      loading,
      actionLoading,
      error,
      refresh,
      addLionFromForm,
      addRandomLions,
      removeLastLion,
      findLion,
    }),
    [
      lions,
      loading,
      actionLoading,
      error,
      refresh,
      addLionFromForm,
      addRandomLions,
      removeLastLion,
      findLion,
    ]
  );

  return <LionsContext.Provider value={value}>{children}</LionsContext.Provider>;
}

export function useLions(): LionsContextValue {
  const context = useContext(LionsContext);
  if (!context) {
    throw new Error('useLions는 LionsProvider 안에서 사용해야 합니다.');
  }
  return context;
}
