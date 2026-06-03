import type { LionInsert, LionRow } from '../types/database';
import type { Lion, PartValue } from '../types/lion';
import { parsePartFromRow } from '../types/lion';
import { parseSkills } from '../utils/lions';

export function rowToLion(row: LionRow): Lion {
  const skills = parseSkills(row.skills ?? []);
  return {
    id: row.id,
    name: row.name,
    part: parsePartFromRow(row.part),
    intro: row.intro ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    website: row.website ?? '',
    skills,
    tag: row.tag ?? skills[0] ?? 'Lion',
    motto: row.motto ?? '',
    image: row.image ?? '',
    track: row.track ?? 'LION TRACK',
    createdAt: new Date(row.created_at).getTime(),
  };
}

export function rowsToLions(rows: LionRow[]): Lion[] {
  return rows.map(rowToLion);
}

export function formToLionInsert(
  form: {
    name: string;
    part: PartValue;
    intro: string;
    email: string;
    phone: string;
    website: string;
    skills: string;
    motto: string;
  },
  image?: string
): LionInsert {
  const skills = parseSkills(form.skills);
  return {
    name: form.name.trim(),
    part: form.part,
    intro: form.intro.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    website: form.website.trim(),
    skills,
    tag: skills[0] ?? 'Lion',
    motto: form.motto.trim(),
    image: image ?? '',
    track: 'LION TRACK',
  };
}

export function lionToInsert(lion: Omit<Lion, 'id' | 'createdAt'>): LionInsert {
  return {
    name: lion.name,
    part: lion.part,
    intro: lion.intro,
    email: lion.email,
    phone: lion.phone,
    website: lion.website,
    skills: lion.skills,
    tag: lion.tag,
    motto: lion.motto,
    image: lion.image,
    track: lion.track,
  };
}
