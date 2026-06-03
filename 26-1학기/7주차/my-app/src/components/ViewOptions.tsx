import type { ChangeEvent } from 'react';
import { PARTS, SORT_OPTIONS } from '../constants';
import type { PartFilterValue, SortValue, ViewOptionsProps } from '../types/lion';

function ViewOptions({ view, onChange }: ViewOptionsProps) {
  const handlePartChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ part: e.target.value as PartFilterValue });
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange({ sort: e.target.value as SortValue });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ q: e.target.value });
  };

  return (
    <section className="view-options" aria-label="보기 옵션">
      <label className="view-field">
        <span className="view-label">파트</span>
        <select value={view.part} onChange={handlePartChange}>
          {PARTS.map((part) => (
            <option key={part.value} value={part.value}>
              {part.label}
            </option>
          ))}
        </select>
      </label>
      <label className="view-field">
        <span className="view-label">정렬</span>
        <select value={view.sort} onChange={handleSortChange}>
          {SORT_OPTIONS.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </label>
      <label className="view-field view-field-search">
        <span className="view-label">검색</span>
        <input
          type="search"
          placeholder="이름으로 검색"
          value={view.q}
          onChange={handleSearchChange}
        />
      </label>
    </section>
  );
}

export default ViewOptions;
