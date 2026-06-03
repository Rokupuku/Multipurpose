export type PartValue = 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'PM';

export type PartFilterValue = PartValue | 'ALL';

export type SortValue = 'latest' | 'name';

export interface Lion {
  id: string;
  name: string;
  part: PartValue;
  intro: string;
  email: string;
  phone: string;
  website: string;
  skills: string[];
  tag: string;
  motto: string;
  image: string;
  track: string;
  createdAt: number;
}

export interface LionFormData {
  name: string;
  part: PartValue;
  intro: string;
  email: string;
  phone: string;
  website: string;
  skills: string;
  motto: string;
}

export type LionFormErrors = Partial<Record<keyof LionFormData, string>>;

export interface ViewOptions {
  part: PartFilterValue;
  sort: SortValue;
  q: string;
}

export type ViewOptionsPatch = Partial<ViewOptions>;

export interface RandomMemberFields {
  part: PartValue;
  skills: string[];
  tag: string;
  motto: string;
  intro: string;
  track: string;
}

export interface DetailLocationState {
  from?: string;
}

export interface OptionItem<T extends string> {
  value: T;
  label: string;
}

export interface RosterControlsProps {
  totalCount: number;
  isAuthenticated: boolean;
  onAdd: () => void;
  onRemoveLast: () => void;
  onAddRandom1: () => void;
  onAddRandom5: () => void;
  onRefreshAll: () => void;
  loading: boolean;
  statusText: string;
  authHint?: string;
}

export interface ViewOptionsProps {
  view: ViewOptions;
  onChange: (patch: ViewOptionsPatch) => void;
}

export interface SummaryCardProps {
  lion: Lion;
  onClick: () => void;
}

export interface DetailCardProps {
  lion: Lion;
}

export interface LionFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (form: LionFormData) => Promise<void>;
  submitting: boolean;
}

export interface RandomUserName {
  first: string;
  last: string;
}

export interface RandomUserPicture {
  large: string;
}

export interface RandomUserResult {
  name: RandomUserName;
  email: string;
  phone: string;
  picture: RandomUserPicture;
}

export interface RandomUserApiResponse {
  results: RandomUserResult[];
}

export function isPartValue(value: string): value is PartValue {
  return value === 'FRONTEND' || value === 'BACKEND' || value === 'DESIGN' || value === 'PM';
}

export function parsePartFromRow(part: string): PartValue {
  return isPartValue(part) ? part : 'FRONTEND';
}
