import { Link, useLocation, useParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import DetailCard from '../components/DetailCard';
import { useLions } from '../hooks/useLions';
import type { DetailLocationState } from '../types/lion';

function DetailPage() {
  const { memberId } = useParams<{ memberId: string }>();
  const location = useLocation();
  const { findLion, loading } = useLions();
  const lion = findLion(memberId);
  const state = location.state as DetailLocationState | null;
  const backTo = state?.from ?? '/';

  if (loading) {
    return (
      <div className="App">
        <AppHeader />
        <main className="app-main">
          <p className="page-loading" role="status">
            불러오는 중…
          </p>
        </main>
      </div>
    );
  }

  if (!lion) {
    return (
      <div className="App">
        <AppHeader />
        <main className="app-main">
          <div className="page detail-page">
            <div className="detail-topbar">
              <Link className="detail-back" to={backTo}>
                ← 목록으로
              </Link>
            </div>
            <p className="empty">해당 멤버를 찾을 수 없습니다.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <AppHeader />
      <main className="app-main">
        <div className="page detail-page">
          <div className="detail-topbar">
            <Link className="detail-back" to={backTo}>
              ← 목록으로
            </Link>
          </div>
          <DetailCard lion={lion} />
        </div>
      </main>
    </div>
  );
}

export default DetailPage;
