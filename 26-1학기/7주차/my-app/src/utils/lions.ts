import { PART_DISPLAY } from '../constants';
import type { LionInsert } from '../types/database';
import type {
  Lion,
  PartValue,
  RandomMemberFields,
  RandomUserApiResponse,
  ViewOptions,
} from '../types/lion';

export function parseSkills(skills: string[] | string | undefined): string[] {
  if (Array.isArray(skills)) return skills.filter(Boolean);
  if (!skills || !String(skills).trim()) return [];
  return String(skills)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getCardTag(lion: Lion): string {
  if (lion.tag) return lion.tag;
  const skills = parseSkills(lion.skills);
  return skills[0] ?? 'Lion';
}

export function cardImageUrl(lion: Lion): string {
  if (lion.image) return lion.image;
  return `https://picsum.photos/seed/${encodeURIComponent(lion.id)}/640/360`;
}

export function filterAndSortLions(lions: Lion[], view: ViewOptions): Lion[] {
  const query = view.q.trim().toLowerCase();
  let result = lions.filter((lion) => {
    if (view.part !== 'ALL' && lion.part !== view.part) return false;
    if (query && !lion.name.toLowerCase().includes(query)) return false;
    return true;
  });

  if (view.sort === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  } else {
    result = [...result].sort((a, b) => b.createdAt - a.createdAt);
  }

  return result;
}

export function partDisplay(part: PartValue): string {
  return PART_DISPLAY[part] ?? part;
}

const PART_POOL: PartValue[] = ['FRONTEND', 'BACKEND', 'DESIGN', 'PM'];
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
const INTRO_POOL: Record<PartValue, string> = {
  FRONTEND: '사용자 경험을 최우선으로 생각하며 인터페이스를 만듭니다.',
  BACKEND:
    'API 일관성과 네이밍 컨벤션, RESTful 원칙을 중시합니다. GraphQL에도 관심이 있습니다.',
  DESIGN: '의미 있는 시각 표현을 만들고 싶습니다.',
  PM: '팀의 목표를 명확히 하고 실행 가능한 계획을 세웁니다.',
};

export function randomMemberFields(): RandomMemberFields {
  const part = PART_POOL[Math.floor(Math.random() * PART_POOL.length)]!;
  const skillCount = 2 + Math.floor(Math.random() * 2);
  const skills: string[] = [];
  while (skills.length < skillCount) {
    const skill = SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)]!;
    if (!skills.includes(skill)) skills.push(skill);
  }
  return {
    part,
    skills,
    tag: skills[0]!,
    motto: MOTTO_POOL[Math.floor(Math.random() * MOTTO_POOL.length)]!,
    intro: INTRO_POOL[part],
    track: 'LION TRACK',
  };
}

export async function fetchRandomUserProfiles(count = 1) {
  const response = await fetch(
    `https://randomuser.me/api/?results=${count}&nat=kr&inc=name,email,phone,picture`
  );
  if (!response.ok) {
    throw new Error('외부 데이터를 불러오지 못했습니다.');
  }
  const data = (await response.json()) as RandomUserApiResponse;
  return data.results;
}

export function randomUserToLionInsert(
  user: RandomUserApiResponse['results'][0]
): LionInsert {
  const random = randomMemberFields();
  const skills = random.skills;
  return {
    name: `${user.name.last}${user.name.first}`,
    part: random.part,
    intro: random.intro,
    email: user.email,
    phone: user.phone,
    website: '',
    skills,
    tag: skills[0]!,
    motto: random.motto,
    image: user.picture.large,
    track: random.track,
  };
}
