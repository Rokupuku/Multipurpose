import { useCallback, useEffect, useState } from 'react';
import { loadMembers, saveMembers } from '../utils/members';
import { storageKey } from '../constants';

const SAMPLE = [
  {
    id: 'lion-1',
    name: '신아기사자',
    part: 'DESIGN',
    intro: '의미 있는 시각 표현을 만들고 싶습니다.',
    email: 'lionsin@example.com',
    phone: '010-1234-5678',
    website: 'https://design.portfolio',
    skills: ['Typography', 'Figma', 'UI Design'],
    tag: 'Typography',
    motto: '디자인으로 메시지를 전달하고 싶습니다.',
    image: 'https://picsum.photos/seed/lion-1/640/360',
    track: 'LION TRACK',
    createdAt: 9,
  },
  {
    id: 'lion-2',
    name: '한아기사자',
    part: 'BACKEND',
    intro:
      'API 일관성과 네이밍 컨벤션, RESTful 원칙을 중시합니다. GraphQL에도 관심이 있습니다.',
    email: 'lionhan@example.com',
    phone: '010-8901-2345',
    website: 'https://api.docs',
    skills: ['GraphQL', 'OpenAPI', 'API Gateway'],
    tag: 'GraphQL',
    motto: '일관되고 명확한 API로 팀 협업을 원활하게 하고 싶습니다.',
    image: 'https://picsum.photos/seed/lion-2/640/360',
    track: 'LION TRACK',
    createdAt: 8,
  },
  {
    id: 'lion-3',
    name: '김아기사자',
    part: 'FRONTEND',
    intro: '접근성과 성능을 고려한 UI를 구현합니다.',
    email: 'lionkim@example.com',
    phone: '010-2345-6789',
    website: '',
    skills: ['React', 'CSS Grid', 'TypeScript'],
    tag: 'CSS Grid',
    motto: '모든 사용자가 편한 웹을 만듭니다.',
    image: 'https://picsum.photos/seed/lion-3/640/360',
    track: 'LION TRACK',
    createdAt: 7,
  },
  {
    id: 'lion-4',
    name: '박아기사자',
    part: 'FRONTEND',
    intro: '컴포넌트 설계와 상태 관리에 관심이 많습니다.',
    email: 'lionpark@example.com',
    phone: '010-3456-7890',
    website: 'https://github.com',
    skills: ['React', 'Zustand', 'Storybook'],
    tag: 'React',
    motto: '재사용 가능한 UI를 지향합니다.',
    image: 'https://picsum.photos/seed/lion-4/640/360',
    track: 'LION TRACK',
    createdAt: 6,
  },
  {
    id: 'lion-5',
    name: '이아기사자',
    part: 'BACKEND',
    intro: '안정적인 서버 아키텍처를 설계합니다.',
    email: 'lionlee@example.com',
    phone: '010-4567-8901',
    website: '',
    skills: ['Spring', 'MySQL', 'Redis'],
    tag: 'Spring',
    motto: '신뢰할 수 있는 백엔드를 만듭니다.',
    image: 'https://picsum.photos/seed/lion-5/640/360',
    track: 'LION TRACK',
    createdAt: 5,
  },
  {
    id: 'lion-6',
    name: '최아기사자',
    part: 'DESIGN',
    intro: '브랜드 아이덴티티와 일관된 디자인 시스템을 만듭니다.',
    email: 'lionchoi@example.com',
    phone: '010-5678-9012',
    website: '',
    skills: ['Figma', 'Illustration', 'Branding'],
    tag: 'Figma',
    motto: '보기 좋은 것이 쓰기 좋은 것입니다.',
    image: 'https://picsum.photos/seed/lion-6/640/360',
    track: 'LION TRACK',
    createdAt: 4,
  },
  {
    id: 'lion-7',
    name: '정아기사자',
    part: 'PM',
    intro: '팀의 목표를 명확히 하고 실행 가능한 계획을 세웁니다.',
    email: 'lionjung@example.com',
    phone: '010-6789-0123',
    website: '',
    skills: ['Notion', 'Jira', 'Figma'],
    tag: 'Notion',
    motto: '소통이 프로젝트의 핵심입니다.',
    image: 'https://picsum.photos/seed/lion-7/640/360',
    track: 'LION TRACK',
    createdAt: 3,
  },
  {
    id: 'lion-8',
    name: '윤아기사자',
    part: 'FRONTEND',
    intro: '반응형 레이아웃과 애니메이션 구현에 집중합니다.',
    email: 'lionsyun@example.com',
    phone: '010-7890-1234',
    website: '',
    skills: ['CSS Grid', 'GSAP', 'Vue'],
    tag: 'CSS Grid',
    motto: '움직임에 의미를 담습니다.',
    image: 'https://picsum.photos/seed/lion-8/640/360',
    track: 'LION TRACK',
    createdAt: 2,
  },
  {
    id: 'lion-9',
    name: '조아기사자',
    part: 'BACKEND',
    intro: '데이터 모델링과 쿼리 최적화를 연구합니다.',
    email: 'lionjo@example.com',
    phone: '010-8901-2346',
    website: '',
    skills: ['PostgreSQL', 'Docker', 'Kubernetes'],
    tag: 'PostgreSQL',
    motto: '데이터 흐름을 이해하는 개발자가 되겠습니다.',
    image: 'https://picsum.photos/seed/lion-9/640/360',
    track: 'LION TRACK',
    createdAt: 1,
  },
];

export function useMembers(basePath) {
  const key = storageKey(basePath);
  const [members, setMembers] = useState(() => {
    const stored = loadMembers(key);
    return stored.length ? stored : SAMPLE;
  });

  useEffect(() => {
    saveMembers(key, members);
  }, [key, members]);

  const addMember = useCallback((member) => {
    setMembers((prev) => [...prev, member]);
  }, []);

  const addMembers = useCallback((items) => {
    setMembers((prev) => [...prev, ...items]);
  }, []);

  const removeLastMember = useCallback(() => {
    setMembers((prev) => (prev.length ? prev.slice(0, -1) : prev));
  }, []);

  const replaceMembers = useCallback((items) => {
    setMembers(items);
  }, []);

  const findMember = useCallback(
    (id) => members.find((m) => m.id === id),
    [members]
  );

  return {
    members,
    addMember,
    addMembers,
    removeLastMember,
    replaceMembers,
    findMember,
  };
}
