import { PARTS, SORT_OPTIONS } from '../constants';

function ViewOptions({ view, onChange }) {
  return (
    <section className="view-options" aria-label="보기 옵션">
      <label className="view-field">
        <span className="view-label">파트</span>
        <select value={view.part} onChange={(e) => onChange({ part: e.target.value })}>
          {PARTS.map((part) => (
            <option key={part.value} value={part.value}>
              {part.label}
            </option>
          ))}
        </select>
      </label>
      <label className="view-field">
        <span className="view-label">정렬</span>
        <select value={view.sort} onChange={(e) => onChange({ sort: e.target.value })}>
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
          onChange={(e) => onChange({ q: e.target.value })}
        />
      </label>
    </section>
  );
}

export default ViewOptions;
