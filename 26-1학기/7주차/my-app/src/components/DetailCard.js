import { TRACK_LABEL } from '../constants';
import { partDisplay, parseSkills } from '../utils/members';

function DetailCard({ member }) {
  const skills = parseSkills(member.skills);

  return (
    <article className="detail-card" aria-label={`${member.name} 상세 프로필`}>
      <header className="detail-card-header">
        <h1 className="detail-card-name">{member.name}</h1>
        <p className="detail-card-part">{partDisplay(member.part)}</p>
        <p className="detail-card-track">{member.track || TRACK_LABEL}</p>
      </header>

      <section className="detail-section">
        <h2>자기소개</h2>
        <p>{member.intro || '-'}</p>
      </section>

      <section className="detail-section">
        <h2>연락처</h2>
        <ul>
          {member.email && <li>Email: {member.email}</li>}
          {member.phone && <li>Phone: {member.phone}</li>}
          {member.website && (
            <li>
              <a href={member.website} target="_blank" rel="noreferrer">
                {member.website}
              </a>
            </li>
          )}
          {!member.email && !member.phone && !member.website && <li>-</li>}
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
        <p>{member.motto || '-'}</p>
      </section>
    </article>
  );
}

export default DetailCard;
