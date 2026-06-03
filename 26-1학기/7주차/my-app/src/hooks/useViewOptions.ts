import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ViewOptions, ViewOptionsPatch } from '../types/lion';
import { buildSearchParams, parseViewOptions } from '../utils/urlViewOptions';

export function useViewOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = useMemo(() => parseViewOptions(searchParams), [searchParams]);

  const setView = useCallback(
    (patch: ViewOptionsPatch) => {
      const next: ViewOptions = { ...view, ...patch };
      setSearchParams(buildSearchParams(next), { replace: false });
    },
    [view, setSearchParams]
  );

  return { view, setView };
}
