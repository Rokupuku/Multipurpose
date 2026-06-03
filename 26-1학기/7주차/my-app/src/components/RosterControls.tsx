import { AUTH_REQUIRED_MESSAGE } from '../constants';
import type { RosterControlsProps } from '../types/lion';

function RosterControls({
  totalCount,
  isAuthenticated,
  onAdd,
  onRemoveLast,
  onAddRandom1,
  onAddRandom5,
  onRefreshAll,
  loading,
  statusText,
}: RosterControlsProps) {
  const mutateDisabled = loading || !isAuthenticated;

  return (
    <section className="roster-controls" aria-label="명단 조작">
      {!isAuthenticated && (
        <p className="auth-hint" role="status">
          {AUTH_REQUIRED_MESSAGE}
        </p>
      )}
      <div className="roster-row">
        <button type="button" className="btn-outline" onClick={onAdd} disabled={mutateDisabled}>
          아기 사자 추가
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={onRemoveLast}
          disabled={mutateDisabled}
        >
          마지막 아기 사자 삭제
        </button>
        <span className="roster-count">총 {totalCount}명</span>
      </div>
      <div className="roster-row">
        <button
          type="button"
          className="btn-outline"
          onClick={onAddRandom1}
          disabled={mutateDisabled}
        >
          랜덤 1명 추가
        </button>
        <button
          type="button"
          className="btn-outline"
          onClick={onAddRandom5}
          disabled={mutateDisabled}
        >
          랜덤 5명 추가
        </button>
        <button type="button" className="btn-outline" onClick={onRefreshAll} disabled={loading}>
          전체 새로고침
        </button>
        <span className={`roster-status ${loading ? 'is-loading' : ''}`} role="status">
          {statusText}
        </span>
      </div>
    </section>
  );
}

export default RosterControls;
