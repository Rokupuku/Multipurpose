import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AuthForm, { type AuthMode } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSuccess = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="App">
      <AppHeader />
      <main className="login-page">
        <div className="auth-card">
          <h1>{mode === 'login' ? '로그인' : '회원가입'}</h1>
          <p className="auth-card-desc">
            {mode === 'login'
              ? '이메일과 비밀번호로 로그인하세요.'
              : '새 계정을 만들어 명단을 관리하세요.'}
          </p>
          <div className="auth-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              className={`auth-tab ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => setMode('login')}
            >
              로그인
            </button>
            <button
              type="button"
              role="tab"
              className={`auth-tab ${mode === 'signup' ? 'is-active' : ''}`}
              onClick={() => setMode('signup')}
            >
              회원가입
            </button>
          </div>
          <AuthForm key={mode} mode={mode} onSuccess={handleSuccess} />
          <p className="auth-footer">
            <Link to="/">목록으로 돌아가기</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
