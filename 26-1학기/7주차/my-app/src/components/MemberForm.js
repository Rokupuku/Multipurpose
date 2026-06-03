import { useCallback, useEffect, useState } from 'react';
import { EMPTY_FORM, PARTS } from '../constants';
import {
  createId,
  formToMember,
  randomMemberFields,
  validateMemberForm,
} from '../utils/members';

function MemberForm({ open, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
  }, []);

  const closeForm = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeForm();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeForm]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleRandom = async () => {
    try {
      const res = await fetch(
        'https://randomuser.me/api/?nat=kr&inc=name,email,phone,picture'
      );
      const data = await res.json();
      const user = data.results[0];
      const random = randomMemberFields();
      setForm({
        name: `${user.name.last}${user.name.first}`,
        part: random.part,
        intro: random.intro,
        email: user.email,
        phone: user.phone,
        website: '',
        skills: random.skills.join(', '),
        motto: random.motto,
      });
      setErrors({});
    } catch {
      const random = randomMemberFields();
      setForm({
        ...EMPTY_FORM,
        name: `아기사자${Math.floor(Math.random() * 900 + 100)}`,
        part: random.part,
        intro: random.intro,
        email: `lion${Date.now()}@example.com`,
        phone: '010-0000-0000',
        skills: random.skills.join(', '),
        motto: random.motto,
      });
      setErrors({});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateMemberForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    onAdd(formToMember(form, createId(), Date.now()));
    closeForm();
  };

  if (!open) return null;

  return (
    <div className="form-overlay" role="dialog" aria-modal="true" aria-label="아기 사자 추가">
      <div className="form-modal">
        <div className="form-modal-header">
          <h2>아기 사자 추가</h2>
          <button type="button" className="form-close" onClick={closeForm} aria-label="닫기">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <label>
              이름 *
              <input
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label>
              파트 *
              <select value={form.part} onChange={(e) => updateField('part', e.target.value)}>
                {PARTS.filter((p) => p.value !== 'ALL').map((part) => (
                  <option key={part.value} value={part.value}>
                    {part.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="full">
              자기소개
              <textarea
                rows={3}
                value={form.intro}
                onChange={(e) => updateField('intro', e.target.value)}
              />
            </label>
            <label>
              이메일
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
            <label>
              연락처
              <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </label>
            <label className="full">
              웹사이트
              <input
                placeholder="https://"
                value={form.website}
                onChange={(e) => updateField('website', e.target.value)}
              />
            </label>
            <label className="full">
              관심 기술
              <input
                placeholder="쉼표로 구분"
                value={form.skills}
                onChange={(e) => updateField('skills', e.target.value)}
              />
            </label>
            <label className="full">
              한 마디
              <input value={form.motto} onChange={(e) => updateField('motto', e.target.value)} />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-outline">
              추가
            </button>
            <button type="button" className="btn-outline" onClick={handleRandom}>
              랜덤 값 채우기
            </button>
            <button type="button" className="btn-outline" onClick={closeForm}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemberForm;
