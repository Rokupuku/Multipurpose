import { useState } from 'react';
import type { FormEvent } from 'react';
import { MIN_PASSWORD_LENGTH } from '../constants';
import { useAuth } from '../hooks/useAuth';

export type AuthMode = 'login' | 'signup';

interface AuthFormProps {
  mode: AuthMode;
  onSuccess?: () => void;
}

function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    if (mode === 'login') {
      const result = await signIn(email, password);
      setSubmitting(false);
      if (result.error) {
        setError(result.error);
        return;
      }
      onSuccess?.();
      return;
    }

    const result = await signUp(email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.info) {
      setInfo(result.info);
      return;
    }
    onSuccess?.();
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label className="auth-field">
        이메일
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="auth-field">
        비밀번호
        <input
          type="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
      </label>
      {mode === 'signup' && (
        <p className="auth-card-desc">비밀번호는 {MIN_PASSWORD_LENGTH}자 이상이어야 합니다.</p>
      )}
      {info && (
        <p className="auth-info" role="status">
          {info}
        </p>
      )}
      {error && (
        <p className="auth-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? '처리 중…' : mode === 'login' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
}

export default AuthForm;
