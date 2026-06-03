import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import LionForm from '../components/LionForm';
import RosterControls from '../components/RosterControls';
import SummaryCard from '../components/SummaryCard';
import ViewOptions from '../components/ViewOptions';
import { memberDetailPath } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { useLions } from '../hooks/useLions';
import { useViewOptions } from '../hooks/useViewOptions';
import type { DetailLocationState } from '../types/lion';
import { filterAndSortLions } from '../utils/lions';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { view, setView } = useViewOptions();
  const { isAuthenticated } = useAuth();
  const {
    lions,
    loading,
    actionLoading,
    error,
    refresh,
    addLionFromForm,
    addRandomLions,
    removeLastLion,
  } = useLions();
  const [formOpen, setFormOpen] = useState(false);

  const visibleLions = useMemo(() => filterAndSortLions(lions, view), [lions, view]);

  const statusText = loading
    ? '데이터 불러오는 중…'
    : actionLoading
      ? '처리 중…'
      : '준비 완료';

  const goToDetail = (id: string) => {
    const from = `${location.pathname}${location.search}`;
    const state: DetailLocationState = { from };
    navigate(memberDetailPath(id), { state });
  };

  const handleMutate = async (action: () => Promise<void>) => {
    if (!isAuthenticated) return;
    try {
      await action();
    } catch {
      /* useLions error state */
    }
  };

  if (loading) {
    return (
      <div className="App">
        <AppHeader />
        <main className="app-main">
          <p className="page-loading" role="status">
            명단을 불러오는 중입니다…
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <AppHeader />
      <main className="app-main">
        <div className="page list-page">
          <RosterControls
            totalCount={lions.length}
            isAuthenticated={isAuthenticated}
            onAdd={() => setFormOpen(true)}
            onRemoveLast={() => handleMutate(removeLastLion)}
            onAddRandom1={() => handleMutate(() => addRandomLions(1))}
            onAddRandom5={() => handleMutate(() => addRandomLions(5))}
            onRefreshAll={() => refresh()}
            loading={actionLoading}
            statusText={statusText}
          />
          <ViewOptions view={view} onChange={setView} />
          <LionForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onAdd={addLionFromForm}
            submitting={actionLoading}
          />

          {error && (
            <p className="fetch-error" role="alert">
              {error}
            </p>
          )}

          <section className="summary-section" aria-label="요약 카드 목록">
            {visibleLions.length === 0 ? (
              <p className="empty">조건에 맞는 멤버가 없습니다.</p>
            ) : (
              <div className="summary-grid">
                {visibleLions.map((lion) => (
                  <SummaryCard key={lion.id} lion={lion} onClick={() => goToDetail(lion.id)} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
