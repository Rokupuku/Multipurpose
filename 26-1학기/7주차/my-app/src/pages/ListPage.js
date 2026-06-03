import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RosterControls from '../components/RosterControls';
import ViewOptions from '../components/ViewOptions';
import MemberForm from '../components/MemberForm';
import SummaryCard from '../components/SummaryCard';
import { useMembers } from '../hooks/useMembers';
import { useViewOptions } from '../hooks/useViewOptions';
import { filterAndSortMembers, fetchRandomMembers } from '../utils/members';

function ListPage({ basePath }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { view, setView } = useViewOptions();
  const { members, addMember, addMembers, removeLastMember, replaceMembers } =
    useMembers(basePath);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const visibleMembers = useMemo(
    () => filterAndSortMembers(members, view),
    [members, view]
  );

  const runFetch = async (count, replace = false) => {
    setLoading(true);
    setFetchError('');
    try {
      const imported = await fetchRandomMembers(count);
      if (replace) {
        replaceMembers(imported);
      } else {
        addMembers(imported);
      }
    } catch (err) {
      setFetchError(err.message || '불러오기에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const statusText = loading ? '불러오는 중…' : '준비 완료';

  const goToDetail = (id) => {
    const from = `${location.pathname}${location.search}`;
    navigate(`${basePath}/${id}`, { state: { from } });
  };

  return (
    <div className="page list-page">
      <RosterControls
        totalCount={members.length}
        onAdd={() => setFormOpen(true)}
        onRemoveLast={removeLastMember}
        onAddRandom1={() => runFetch(1)}
        onAddRandom5={() => runFetch(5)}
        onRefreshAll={() => runFetch(Math.max(members.length, 3), true)}
        loading={loading}
        statusText={statusText}
      />
      <ViewOptions view={view} onChange={setView} />
      <MemberForm open={formOpen} onClose={() => setFormOpen(false)} onAdd={addMember} />

      {fetchError && (
        <p className="fetch-error" role="alert">
          {fetchError}
        </p>
      )}

      <section className="summary-section" aria-label="요약 카드 목록">
        {visibleMembers.length === 0 ? (
          <p className="empty">조건에 맞는 멤버가 없습니다.</p>
        ) : (
          <div className="summary-grid">
            {visibleMembers.map((member) => (
              <SummaryCard
                key={member.id}
                member={member}
                onClick={() => goToDetail(member.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ListPage;
