import { DEFAULT_VIEW } from '../constants';

export function parseViewOptions(searchParams) {
  return {
    part: searchParams.get('part') || DEFAULT_VIEW.part,
    sort: searchParams.get('sort') || DEFAULT_VIEW.sort,
    q: searchParams.get('q') || DEFAULT_VIEW.q,
  };
}

export function buildSearchParams(view) {
  const params = new URLSearchParams();
  if (view.part !== DEFAULT_VIEW.part) params.set('part', view.part);
  if (view.sort !== DEFAULT_VIEW.sort) params.set('sort', view.sort);
  if (view.q.trim()) params.set('q', view.q.trim());
  return params;
}

export function viewOptionsToSearch(view) {
  const params = buildSearchParams(view);
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}
