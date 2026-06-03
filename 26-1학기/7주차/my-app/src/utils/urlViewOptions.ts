import { DEFAULT_VIEW, PART_FILTER_VALUES, SORT_VALUES } from '../constants';
import type { PartFilterValue, SortValue, ViewOptions } from '../types/lion';

function parsePart(value: string | null): PartFilterValue {
  if (value && PART_FILTER_VALUES.includes(value as PartFilterValue)) {
    return value as PartFilterValue;
  }
  return DEFAULT_VIEW.part;
}

function parseSort(value: string | null): SortValue {
  if (value && SORT_VALUES.includes(value as SortValue)) {
    return value as SortValue;
  }
  return DEFAULT_VIEW.sort;
}

export function parseViewOptions(searchParams: URLSearchParams): ViewOptions {
  return {
    part: parsePart(searchParams.get('part')),
    sort: parseSort(searchParams.get('sort')),
    q: searchParams.get('q') ?? DEFAULT_VIEW.q,
  };
}

export function buildSearchParams(view: ViewOptions): URLSearchParams {
  const params = new URLSearchParams();
  if (view.part !== DEFAULT_VIEW.part) params.set('part', view.part);
  if (view.sort !== DEFAULT_VIEW.sort) params.set('sort', view.sort);
  if (view.q.trim()) params.set('q', view.q.trim());
  return params;
}
