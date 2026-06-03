import { PART_DISPLAY } from '../constants';

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadMembers(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMembers(key, members) {
  localStorage.setItem(key, JSON.stringify(members));
}

export function parseSkills(skills) {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (!skills || !String(skills).trim()) return [];
  return String(skills)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getCardTag(member) {
  if (member.tag) return member.tag;
  const skills = parseSkills(member.skills);
  return skills[0] || 'Lion';
}

export function cardImageUrl(member) {
  if (member.image) return member.image;
  return `https://picsum.photos/seed/${encodeURIComponent(member.id)}/640/360`;
}

export function filterAndSortMembers(members, { part, sort, q }) {
  const query = q.trim().toLowerCase();
  let result = members.filter((member) => {
    if (part !== 'ALL' && member.part !== part) return false;
    if (query && !member.name.toLowerCase().includes(query)) return false;
    return true;
  });

  if (sort === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  } else {
    result = [...result].sort((a, b) => b.createdAt - a.createdAt);
  }

  return result;
}

const PART_POOL = ['FRONTEND', 'BACKEND', 'DESIGN', 'PM'];
const SKILL_POOL = [
  'React',
  'TypeScript',
  'GraphQL',
  'OpenAPI',
  'CSS Grid',
  'Typography',
  'Figma',
  'Node.js',
  'Spring',
  'API Gateway',
];
const MOTTO_POOL = [
  '일관되고 명확한 API로 팀 협업을 원활하게 하고 싶습니다.',
  '의미 있는 시각 표현을 만들고 싶습니다.',
  '사용자 경험을 최우선으로 생각합니다.',
  '꾸준히 성장하는 개발자가 되겠습니다.',
];
const INTRO_POOL = {
  FRONTEND: '사용자 경험을 최우선으로 생각하며 인터페이스를 만듭니다.',
  BACKEND:
    'API 일관성과 네이밍 컨벤션, RESTful 원칙을 중시합니다. GraphQL에도 관심이 있습니다.',
  DESIGN: '의미 있는 시각 표현을 만들고 싶습니다.',
  PM: '팀의 목표를 명확히 하고 실행 가능한 계획을 세웁니다.',
};

export function randomMemberFields() {
  const part = PART_POOL[Math.floor(Math.random() * PART_POOL.length)];
  const skillCount = 2 + Math.floor(Math.random() * 2);
  const skills = [];
  while (skills.length < skillCount) {
    const skill = SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)];
    if (!skills.includes(skill)) skills.push(skill);
  }
  return {
    part,
    skills,
    tag: skills[0],
    motto: MOTTO_POOL[Math.floor(Math.random() * MOTTO_POOL.length)],
    intro: INTRO_POOL[part],
    track: 'LION TRACK',
  };
}

export async function fetchRandomMembers(count = 1) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=kr&inc=name,email,phone,picture`
  );
  if (!response.ok) {
    throw new Error('외부 데이터를 불러오지 못했습니다.');
  }
  const data = await response.json();
  const now = Date.now();
  return data.results.map((user, index) => {
    const random = randomMemberFields();
    const skills = random.skills;
    return {
      id: createId(),
      name: `${user.name.last}${user.name.first}`,
      part: random.part,
      intro: random.intro,
      email: user.email,
      phone: user.phone,
      website: '',
      skills,
      tag: skills[0],
      motto: random.motto,
      image: user.picture.large,
      track: random.track,
      createdAt: now + index,
    };
  });
}

export function validateMemberForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.';
  if (!form.part) errors.part = '파트를 선택해 주세요.';
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  return errors;
}

export function formToMember(form, id, createdAt) {
  const skills = parseSkills(form.skills);
  return {
    id,
    name: form.name.trim(),
    part: form.part,
    intro: form.intro.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    website: form.website.trim(),
    skills,
    tag: skills[0] || 'Lion',
    motto: form.motto.trim(),
    image: `https://picsum.photos/seed/${encodeURIComponent(id)}/640/360`,
    track: 'LION TRACK',
    createdAt,
  };
}

export function partDisplay(part) {
  return PART_DISPLAY[part] || part;
}
