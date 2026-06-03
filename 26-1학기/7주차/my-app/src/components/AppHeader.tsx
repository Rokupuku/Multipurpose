import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AppHeader() {
  const { email, isAuthenticated, loading, signOut } = useAuth();

  return (
    <header className="app-header">
      <p className="app-header-title">아기 사자 대시보드</p>
      <div className="app-header-actions">
        {!loading && isAuthenticated && email && (
          <span className="app-header-email">{email}</span>
        )}
        {!loading && isAuthenticated ? (
          <button type="button" className="btn-outline" onClick={() => signOut()}>
            로그아웃
          </button>
        ) : (
          !loading && (
            <Link className="app-header-link" to="/login">
              로그인
            </Link>
          )
        )}
      </div>
    </header>
  );
}

export default AppHeader;
