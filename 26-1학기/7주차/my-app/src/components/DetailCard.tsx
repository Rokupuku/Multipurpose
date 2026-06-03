import { TRACK_LABEL } from '../constants';
import type { DetailCardProps } from '../types/lion';
import { partDisplay, parseSkills } from '../utils/lions';

function DetailCard({ lion }: DetailCardProps) {
  const skills = parseSkills(lion.skills);

  return (
    <article className="detail-card" aria-label={`${lion.name} 상세 프로필`}>
      <header>
        <h1 className="detail-card-name">{lion.name}</h1>
        <p className="detail-card-part">{partDisplay(lion.part)}</p>
        <p className="detail-card-track">{lion.track || TRACK_LABEL}</p>
      </header>

      <section className="detail-section">
        <h2>자기소개</h2>
        <p>{lion.intro || '-'}</p>
      </section>

      <section className="detail-section">
        <h2>연락처</h2>
        <ul>
          {lion.email && <li>Email: {lion.email}</li>}
          {lion.phone && <li>Phone: {lion.phone}</li>}
          {lion.website && (
            <li>
              <a href={lion.website} target="_blank" rel="noreferrer">
                {lion.website}
              </a>
            </li>
          )}
          {!lion.email && !lion.phone && !lion.website && <li>-</li>}
        </ul>
      </section>

      <section className="detail-section">
        <h2>관심 기술</h2>
        <ul>
          {skills.length ? skills.map((skill) => <li key={skill}>{skill}</li>) : <li>-</li>}
        </ul>
      </section>

      <section className="detail-section">
        <h2>한 마디</h2>
        <p>{lion.motto || '-'}</p>
      </section>
    </article>
  );
}

export default DetailCard;
