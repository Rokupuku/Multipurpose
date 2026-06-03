export const PARTS = [
  { value: 'ALL', label: '전체' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'PM', label: '기획' },
];

export const PART_DISPLAY = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DESIGN: 'Design',
  PM: 'PM',
};

export const PART_LABEL = PART_DISPLAY;

export const SORT_OPTIONS = [
  { value: 'latest', label: '최신추가순' },
  { value: 'name', label: '이름순' },
];

export const DEFAULT_VIEW = {
  part: 'ALL',
  sort: 'latest',
  q: '',
};

export const TRACK_LABEL = 'LION TRACK';

export const EMPTY_FORM = {
  name: '',
  part: 'FRONTEND',
  intro: '',
  email: '',
  phone: '',
  website: '',
  skills: '',
  motto: '',
};

export function storageKey(basePath) {
  return `roster-members:${basePath}`;
}
