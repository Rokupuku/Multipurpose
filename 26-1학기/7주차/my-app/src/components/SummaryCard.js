import { partDisplay, cardImageUrl, getCardTag } from '../utils/members';

function SummaryCard({ member, onClick }) {
  return (
    <article
      className="summary-card"
      tabIndex={0}
      role="link"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="summary-card-media">
        <img src={cardImageUrl(member)} alt="" />
        <span className="summary-card-tag">{getCardTag(member)}</span>
      </div>
      <div className="summary-card-body">
        <h3 className="summary-card-name">{member.name}</h3>
        <p className="summary-card-part">{partDisplay(member.part)}</p>
        <p className="summary-card-intro">{member.intro || '자기소개가 없습니다.'}</p>
      </div>
    </article>
  );
}

export default SummaryCard;
