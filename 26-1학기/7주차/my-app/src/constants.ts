import type { LionFormData, OptionItem, PartFilterValue, PartValue, SortValue, ViewOptions } from './types/lion';

export const PARTS: OptionItem<PartFilterValue>[] = [
  { value: 'ALL', label: '전체' },
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'DESIGN', label: '디자인' },
  { value: 'PM', label: '기획' },
];

export const PART_DISPLAY: Record<PartValue, string> = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DESIGN: 'Design',
  PM: 'PM',
};

export const SORT_OPTIONS: OptionItem<SortValue>[] = [
  { value: 'latest', label: '최신추가순' },
  { value: 'name', label: '이름순' },
];

export const DEFAULT_VIEW: ViewOptions = {
  part: 'ALL',
  sort: 'latest',
  q: '',
};

export const TRACK_LABEL = 'LION TRACK';

export const EMPTY_FORM: LionFormData = {
  name: '',
  part: 'FRONTEND',
  intro: '',
  email: '',
  phone: '',
  website: '',
  skills: '',
  motto: '',
};

export const APP_BASE_PATH = '/';

export const PART_FILTER_VALUES: PartFilterValue[] = ['ALL', 'FRONTEND', 'BACKEND', 'DESIGN', 'PM'];
export const SORT_VALUES: SortValue[] = ['latest', 'name'];

export const MIN_PASSWORD_LENGTH = 6;

export const AUTH_REQUIRED_MESSAGE = '추가·삭제는 로그인 후 이용할 수 있습니다.';

export function memberDetailPath(memberId: string): string {
  return `/${memberId}`;
}
