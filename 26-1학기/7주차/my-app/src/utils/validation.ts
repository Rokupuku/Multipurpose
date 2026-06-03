import { MIN_PASSWORD_LENGTH } from '../constants';
import type { LionFormData, LionFormErrors } from '../types/lion';

export function validateLionForm(form: LionFormData): LionFormErrors {
  const errors: LionFormErrors = {};
  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.';
  if (!form.part) errors.part = '파트를 선택해 주세요.';
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  return errors;
}

export function validateSignUpPassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
  }
  return null;
}

export function validateAuthEmail(email: string): string | null {
  if (!email.trim()) return '이메일을 입력해 주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return null;
}

export function mapAuthErrorMessage(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('invalid login credentials')) {
    return '이메일 또는 비밀번호가 올바르지 않습니다.';
  }
  if (
    lower.includes('user already registered') ||
    lower.includes('already been registered') ||
    lower.includes('already registered')
  ) {
    return '이미 가입된 이메일입니다. 로그인 탭에서 로그인해 주세요.';
  }
  if (lower.includes('rate limit') || lower.includes('email rate')) {
    return '이메일 전송 한도에 걸렸습니다. Supabase에서 Confirm email을 끄거나 잠시 후 다시 시도해 주세요.';
  }
  if (
    lower.includes('email signups are disabled') ||
    lower.includes('signup is disabled') ||
    lower.includes('signups not allowed')
  ) {
    return 'Supabase에서 이메일 가입이 꺼져 있습니다. Authentication → Providers → Email에서 "Enable email signups"를 켜 주세요.';
  }
  if (lower.includes('password') && (lower.includes('short') || lower.includes('weak'))) {
    return `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`;
  }
  if (lower.includes('unable to validate email')) {
    return '이메일 형식을 확인해 주세요.';
  }
  return message;
}
